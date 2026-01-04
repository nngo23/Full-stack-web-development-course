const Notification = ({ errorMessage }: { errorMessage: string | null }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!errorMessage) {
    return null;
  }
  return <div style={style}>{errorMessage}</div>;
};

export default Notification;
