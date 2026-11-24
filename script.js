const gambar = document.querySelector(".bg img");

// Audio
const soundBenar = new Audio("sound/benar.mp3");
const soundSalah = new Audio("sound/salah.mp3");
const soundMenang = new Audio("sound/winner.mp3");
// const soundSuporter = new Audio("sound/supporter.mp3");

const start = document.querySelector(".startGame");
const countdown = document.querySelector(".countdown");
start.addEventListener("click", () => {
  countdown.style.display = "flex";
  start.style.display = "none";
  hitungMundur();
});

function hitungMundur() {
  let angka = 5;
  setInterval(() => {
    const countdownEl = document.querySelector(".text");
    const container = document.querySelector(".container");
    countdownEl.innerHTML = angka;

    if (angka <= 0) {
      countdownEl.innerHTML = "GO!";
    }

    if (angka < 0) {
      container.style.display = "grid";
    }

    angka--;
  }, 1000);
}

let posisi = 0;

// 20 pertanyaan Tim A
const pertanyaanA = [
  { t: " Merah", j: "red" },
  { t: " Biru", j: "blue" },
  { t: " Kuning", j: "yellow" },
  { t: " Hitam", j: "black" },
  { t: " Putih", j: "white" },
  { t: " Ungu", j: "purple" },
  { t: " Hijau", j: "green" },
  { t: " Ayah", j: "father" },
  { t: " Ibu", j: "mother" },
  { t: " Saudara perempuan", j: "sister" },
  { t: " Saudara laki-laki", j: "brother" },
  { t: " Paman", j: "uncle" },
  { t: " Bibi", j: "aunt" },
  { t: " Jeruk", j: "orange" },
  { t: " Pisang", j: "banana" },
  { t: " Mangga", j: "mango" },
  { t: " Kucing", j: "cat" },
  { t: " Harimau", j: "tiger" },
  { t: " Singa", j: "lion" },
  { t: " Meja", j: "table" },
  { t: " Kursi", j: "chair" },
  { t: " Tas", j: "bag" },
  { t: " Buku", j: "book" },
];

// 20 pertanyaan Tim B
const pertanyaanB = [
  { t: " Merah", j: "red" },
  { t: " Biru", j: "blue" },
  { t: " Kuning", j: "yellow" },
  { t: " Hitam", j: "black" },
  { t: " Putih", j: "white" },
  { t: " Ungu", j: "purple" },
  { t: " Hijau", j: "green" },
  { t: " Ayah", j: "father" },
  { t: " Ibu", j: "mother" },
  { t: " Saudara perempuan", j: "sister" },
  { t: " Saudara laki-laki", j: "brother" },
  { t: " Paman", j: "uncle" },
  { t: " Bibi", j: "aunt" },
  { t: " Jeruk", j: "orange" },
  { t: " Pisang", j: "banana" },
  { t: " Mangga", j: "mango" },
  { t: " Kucing", j: "cat" },
  { t: " Harimau", j: "tiger" },
  { t: " Singa", j: "lion" },
  { t: " Meja", j: "table" },
  { t: " Kursi", j: "chair" },
  { t: " Tas", j: "bag" },
  { t: " Buku", j: "book" },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(pertanyaanA);
shuffle(pertanyaanB);

let indexA = 0;
let indexB = 0;

// Tampilkan pertanyaan pertama
document.getElementById("pertanyaanA").textContent = pertanyaanA[indexA].t;
document.getElementById("pertanyaanB").textContent = pertanyaanB[indexB].t;

// ==================================================
//                 JAWAB TIM A
// ==================================================
const jawabA = document.querySelector(".jawabA");
jawabA.onclick = () => {
  const inputA = document.getElementById("jawabanA").value.toLowerCase().trim();

  document.getElementById("jawabanA").value = "";

  if (inputA === pertanyaanA[indexA].j) {
    posisi -= 2;
    gambar.style.transform = `translateX(${posisi}%)`;
    soundBenar.play();
  } else {
    soundSalah.play();
  }

  indexA++;

  if (indexA >= pertanyaanA.length) {
    alert("Pertanyaan Tim A habis!");
    return;
  }

  document.getElementById("pertanyaanA").textContent = pertanyaanA[indexA].t;

  setTimeout(() => {
    cekPemenang();
  }, 1000);
};

// ==================================================
//                 JAWAB TIM B
// ==================================================
const jawabB = document.querySelector(".jawabB");
jawabB.onclick = () => {
  const inputB = document.getElementById("jawabanB").value.toLowerCase().trim();

  document.getElementById("jawabanB").value = "";

  if (inputB === pertanyaanB[indexB].j) {
    posisi += 2;
    gambar.style.transform = `translateX(${posisi}%)`;
    soundBenar.play();
  } else {
    soundSalah.play();
  }

  indexB++;

  if (indexB >= pertanyaanB.length) {
    alert("Pertanyaan Tim B habis!");
    return;
  }

  document.getElementById("pertanyaanB").textContent = pertanyaanB[indexB].t;

  setTimeout(() => {
    cekPemenang();
  }, 1000);
};

// ==========================
// CEK PEMENANG
// ==========================
function cekPemenang() {
  const alertPemenangA = document.querySelector(".alert-pemenangA");
  const alertPemenangB = document.querySelector(".alert-pemenangB");
  const bg = document.querySelector(".bg");
  if (posisi <= -14) {
    soundMenang.play();
    // alert("TIM A MENANG!");
    alertPemenangA.style.display = "block";
    bg.style.opacity = "0.1";
  }

  if (posisi >= 14) {
    soundMenang.play();
    // alert("TIM B MENANG!");
    alertPemenangB.style.display = "block";
    bg.style.opacity = "0.1";
  }
}

///keyboard
// Fungsi untuk membuat keyboard virtual
function buatKeyboard(idKeyboard, inputTarget) {
  const keyboard = document.getElementById(idKeyboard);
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const inputEl = document.getElementById(inputTarget);

  // Tambah tombol huruf
  keys.split("").forEach((huruf) => {
    const tombol = document.createElement("div");
    tombol.className = "key";
    tombol.textContent = huruf;
    tombol.onmousedown = (e) => e.preventDefault();
    tombol.onclick = () => {
      document.getElementById(inputTarget).value += huruf.toLowerCase();
    };
    keyboard.appendChild(tombol);
  });

  // Tombol delete
  const back = document.createElement("div");
  back.className = "key big";
  back.textContent = "◀";
  back.onmousedown = (e) => e.preventDefault();
  back.onclick = () => {
    let inp = document.getElementById(inputTarget);
    inp.value = inp.value.slice(0, -1);
    inputEl.focus();
  };
  keyboard.appendChild(back);

  //tombol space
  const space = document.createElement("div");
  space.className = "key big";
  space.textContent = "▶";
  space.onmousedown = (e) => e.preventDefault();
  space.onclick = () => {
    document.getElementById(inputTarget).value += " ";

    inputEl.focus();
  };
  keyboard.appendChild(space);
}

// Buat 2 keyboard: untuk Tim A dan Tim B
buatKeyboard("keyboardA", "jawabanA");
buatKeyboard("keyboardB", "jawabanB");

//Putar backsound supporter
// Fungsi untuk memutar suara supporter sekali saja saat layar diklik
function putarBacksound(e) {
  // // Jika yang diklik adalah icon, jangan putar supporter
  if (e.target.closest(".icon")) {
    return;
  }
  soundSuporter.loop = true; // Opsional: Agar lagu otomatis mengulang terus saat habis
  soundSuporter.volume = 0.5; // Opsional: Mengecilkan suara supporter agar tidak menutupi sound benar/salah (rentang 0.0 - 1.0)

  soundSuporter
    .play()
    .then(() => {
      // Jika berhasil diputar, hapus sensor klik agar fungsi ini tidak berjalan terus-menerus setiap kali diklik
      document.removeEventListener("click", putarBacksound);
    })
    .catch((error) => {
      console.log("Autoplay diblokir oleh browser, menunggu interaksi pengguna.");
    });
}

// Pasang sensor klik global pada dokumen
document.addEventListener("click", putarBacksound);

// Jika icon diklik
const icon = document.querySelector("#icon ");

icon.addEventListener("click", function (e) {
  // Hentikan event agar tidak diteruskan ke document
  e.stopPropagation();
  // Matikan supporter
  soundSuporter.pause();
  // Opsional: kembali ke awal
  soundSuporter.currentTime = 0;
});
