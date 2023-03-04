const Wrapper = (Component: any) => (props: any) => {
  return (
    <div className="content">
      <Component {...props} />
    </div>
  );
};

export default Wrapper;
