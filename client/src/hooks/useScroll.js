function useScrollTop(top) {
  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

export default useScrollTop;
