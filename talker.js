chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Read it out";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                           "id": "context" + context, }); 
  });
  chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  console.log("Extension button called", info);
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance(info.selectionText);
    chrome.storage.sync.get({
      voice: "Google US English",
      vol: 0.5,
      speed: 1,
      pitch: 2
      }, function(items) {
      msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == items.voice; })[0];
      msg.volume = items.vol;
      msg.rate = items.speed;
      msg.pitch = items.pitch;
      console.log(info, msg);
      speechSynthesis.speak(msg);
      });
    
    
   }
   
};
