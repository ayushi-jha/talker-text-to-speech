
// Code for creating the options window - the window has a dropdown for selecting the narrator's voice and adjusting volume, rate and pitch.
window.speechSynthesis.onvoiceschanged = function() {
  var voices = window.speechSynthesis.getVoices();
  // Build the dropdown with the list of available voices
  var voice_list = document.getElementById("voices");
  for (var i = 0; i < voices.length; i++)
  {
      var el = document.createElement("option");
      el.textContent = voices[i].name;
      el.value = voices[i].name;
      voice_list.appendChild(el);
  }

  // Set the default values for all inputs from the stored values
  chrome.storage.sync.get({
    voice: "Google US English",
    vol: 1,
    speed: 1,
    pitch: 1
    }, function(items) {
    document.getElementById('voices').value = items.voice;
    document.getElementById('vol').value = items.vol;
    document.getElementById('speed').value = items.speed;
    document.getElementById('pitch').value = items.pitch;
    });
  // Add listener for save button to save the changed options
  document.getElementById('save').addEventListener('click',save_options);
};

// Function to save the changed user preferences to chrome synced storage
function save_options() {
  var voice = document.getElementById('voices').value;
  var x_vol = document.getElementById('vol').value;
  var x_speed = document.getElementById('speed').value;
  var x_pitch = document.getElementById('pitch').value;
  chrome.storage.sync.set({
  voice: voice,
  vol: x_vol,
  speed: x_speed,
  pitch: x_pitch
  }, function() {
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function() {
    status.textContent = '';
  }, 750);
  });
}