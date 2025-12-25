import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotification } from "./context/NotificationContext";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const blogFormRef = useRef();
  const [user, setUser] = useState(null);
  const { notification, showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const sortedBlogs = [...blogs].sort((c, d) => d.likes - c.likes);

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      showNotification(
        "success",
        `a new blog '${newBlog.title}' by ${newBlog.author} created`
      );
    },
    onError: () => {
      showNotification("error", "Failed to create blog");
    },
  });

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    addBlogMutation.mutate(blogObject);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      showNotification("success", `Welcome ${user.name}`);
    } catch {
      showNotification("error", "wrong username or password");
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
  };

  const updateLikeMutation = useMutation({
    mutationFn: (b) =>
      blogService.update(b.id, {
        ...b,
        likes: b.likes + 1,
      }),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
      showNotification("success", `Liked '${updatedBlog.title}'`);
    },
    onError: () => {
      showNotification("error", "Failed to update like");
    },
  });

  const updateLike = (blog) => {
    updateLikeMutation.mutate(blog);
  };

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (removedId) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.filter((b) => b.id !== removedId)
      );
      showNotification("success", "Removed blog successfully");
    },
    onError: () => {
      showNotification("error", "Failed to remove blog");
    },
  });

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>

      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm onLogin={handleLogin} />
        </Togglable>
      )}

      {user && (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </>
      )}

      <Togglable buttonLabel="show blogs">
        {sortedBlogs.map((b) => (
          <Blog
            key={b.id}
            blog={b}
            user={user}
            updateLike={updateLike}
            removeBlog={removeBlog}
          />
        ))}
      </Togglable>
    </div>
  );
};

export default App;
