const regExp =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

var videoID = "";

const extract = (url) => {
  let match = url.match(regExp);
  let urlJson = `https://www.youtube.com/oembed?url=${url}&format=json`;

  if (match && match[7].length == 11) {
    videoID = match[7];
    console.log("Valid URL");
    $(".result").html("");
    fetch(urlJson)
      .then((res) => res.json())
      .then((out) => {
        console.log(out);
        showResults(out);
      });
  } else {
    console.log("Invalid URL!");
    alert("Invalid URL!");
    $(".result").html("");
    $(".input").val("");
  }
};

const showResults = (data) => {
  window.location.href = "#result";
  $(".result").html(`
  <div class="details">
    <p>Title : <span>${data.title}</span></p>
    <p>Author : <span>${data.author_name}</span></p>
  </div>
  <h3>Getting thumbnails:</h3>
  <div class="img-container">
    <img src="https://i1.ytimg.com/vi/${videoID}/1.jpg" />
    <img src="https://i1.ytimg.com/vi/${videoID}/2.jpg" />
    <img src="https://i1.ytimg.com/vi/${videoID}/3.jpg" />
  </div>
  <div>
    <h3>High Quality:</h3>
    <img src="https://i1.ytimg.com/vi/${videoID}/hqdefault.jpg" class="high-ql">
  </div>
  <div>
    <h3>Higher Quality:</h3>
    <img src="https://i1.ytimg.com/vi/${videoID}/sddefault.jpg" class="higher-ql">
  </div>
  <div>
    <h3>Best Quality:</h3>
    <img src="https://i1.ytimg.com/vi/${videoID}/maxresdefault.jpg" class="best-ql">
  </div>
  `);
};
$(".form").submit((e) => {
  e.preventDefault();
  extract($(".form input").val());
});
