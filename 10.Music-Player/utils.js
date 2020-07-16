function catchAsyncException(func) {
  return (...args) => {
    func.apply(null, args).catch((err) => {
      alert('Something went wrong! 😢');
      console.error(err);
      return;
    });
  };
}
