var vm = new Vue({
  el: '#app',
  data: {
    buttons: [
      {text: "Hallo"},
      {text: "Wie geht es dir?"},
      {text: "Danke"},
      {text: "Bitte"},
    ],
  },
  methods: {
    talk: function(event) {
        text = event.currentTarget.innerText;
        console.log(text); // returns 'foo'
        //alert('talk: ' + text);

        var to_speak = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(to_speak);
    }
  },
  mounted: function () {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('q'));
    var splitted = urlParams.get('q').split(";");
    console.log(splitted);
    if (splitted.length>0) {
      this.buttons = new Array();
    }
    for (var i = 0; i < splitted.length; i++) {
      if (splitted[i]!="") {
        this.buttons.push({text: splitted[i]});
      }
    }
  }
});
