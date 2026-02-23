document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-item').forEach(item => {
    const video = item.querySelector('.project-video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
});