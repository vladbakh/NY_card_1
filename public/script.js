const envelope = document.getElementById("envelope");
const card = document.getElementById("card");
const img = document.getElementById("aiImage");
const music = document.getElementById("music");

envelope.onclick = async () => {
  envelope.classList.add("opened");
  music.play();

  setTimeout(async () => {
    envelope.style.display = "none";
    card.classList.remove("hidden");
    await generate();
  }, 800);
};

async function loadBase64(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise(r => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result.split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

async function generate() {
  img.alt = "Генерация...";
  const images = await Promise.all([
    loadBase64("/photos/1.jpg"),
    loadBase64("/photos/2.jpg"),
    loadBase64("/photos/3.jpg")
  ]);

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ images })
  });

  const data = await res.json();
  img.src = "data:image/png;base64," + data.image;
}
