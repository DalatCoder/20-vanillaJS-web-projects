function catchAsyncException(func) {
  return (...args) => {
    func.apply(null, args).catch((err) => {
      alert('Something went wrong! 😢');
      console.error(err);
      return;
    });
  };
}

function showSpinLoading() {
  document.getElementById('spin-load-container').classList.add('show');
}

function hideSpinLoading() {
  document.getElementById('spin-load-container').classList.remove('show');
}
