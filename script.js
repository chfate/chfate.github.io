document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.project-video');

  videos.forEach(video => {
    const container = video.closest('.project-item');

    container.addEventListener('mouseenter', () => {
      video.play().catch(() => {}); // Αγνόησε σφάλματα autoplay policy
    });

    container.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // Επιστροφή στην αρχή για replay on next hover
    });
  });
});