
var vm = new Vue({
  el: '#app',
  data: {
    showInfoButton: true,
    showInfoText: false,
    buttons: [
      {text: "Hallo"},
      {text: "Wie geht es dir?"},
      {text: "Danke"},
      {text: "Bitte"},
    ],
    help_de: "<b>Anleitung:</b><br/>Die Buttons können ganz einfach über die Adresse (URL) der Webseite definiert werden!<br/>Dazu muss der Parameter 'buttons' gesetzt werden, die einzelnen Buttontexte müssen durch ein Semikolon getrennt werden.<br/>Beispiel:<br/><pre><a href='http://buttons.letmesayit.org?buttons=Hallo;Ja;Nein' target='_blank'>buttons.letmesayit.org?buttons=Hallo;Ja;Nein</a></pre>Der Info-Button kann ausgeblendet werden, wenn in der URL ein '&info=false' <a href='http://buttons.letmesayit.org?buttons=Hallo;Ja;Nein&info=false' target='_blank'>angehängt</a> wird.",
    help_en: "<b>Help:</b><br/>You can define the buttons with the address (URL) of the website!<br/>You only need to set the parameter 'buttons', the button texts must be seperated with a semicolon.<br/>Example:<br/><pre><a href='http://buttons.letmesayit.org?buttons=Hello;Yes;No' target='_blank'>buttons.letmesayit.org?buttons=Hello;Yes;No</a></pre>You can hide tho info button by <a href='http://buttons.letmesayit.org?buttons=Hello;Yes;No' target='_blank'>appending</a> '&info=false' to the URL.",

  },
  methods: {
    talk: function(event) {
        text = event.currentTarget.innerText;
        console.log(text); // returns 'foo'
        //alert('talk: ' + text);

        var to_speak = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(to_speak);
    },
    toggleHelp: function() {
      this.showInfoText = !this.showInfoText;
    }
  },
  mounted: function () {
    //##########   helptext   ################
    var userLang = navigator.language || navigator.userLanguage;
    console.log("The language is: " + userLang);
    var helptext = this.help_en; //default
    if (userLang.startsWith("de")) {
      helptext = this.help_de;
    }
    else if (userLang.startsWith("en")) {
      helptext = this.help_en;
    }
    document.getElementById('help').innerHTML = helptext;


    var urlParams = new URLSearchParams(window.location.search);
    //##########   help button   ################
    var info = urlParams.get('info');
    if (info=="false") {
      this.showInfoButton = false;
    }


    //##########   create buttons   ################
    var query = urlParams.get('buttons');
    if (query!=null) {
      var splitted = query.split(";");
      if (splitted.length>0) {
        this.buttons = new Array();
        for (var i = 0; i < splitted.length; i++) {
          if (splitted[i]!="") {
            this.buttons.push({text: splitted[i]});
          }
        }
      }
    }

  }
});
