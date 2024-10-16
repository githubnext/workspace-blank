document.getElementById('wavFile').addEventListener('change', handleWavFile);
document.getElementById('srtFile').addEventListener('change', handleSrtFile);
document.getElementById('fullscreenButton').addEventListener('click', toggleFullScreen);

let audioContext;
let audioBuffer;
let subtitles = [];
let currentSubtitleIndex = 0;
let matrixInterval;

function handleWavFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(e.target.result, function(buffer) {
            audioBuffer = buffer;
            playAudio();
        });
    };
    reader.readAsArrayBuffer(file);
}

function handleSrtFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        subtitles = parseSrt(e.target.result);
    };
    reader.readAsText(file);
}

function parseSrt(data) {
    const srt = data.split('\n\n');
    return srt.map(entry => {
        const [index, time, ...text] = entry.split('\n');
        const [start, end] = time.split(' --> ');
        return {
            start: parseTime(start),
            end: parseTime(end),
            text: text.join('\n')
        };
    });
}

function parseTime(time) {
    const [hours, minutes, seconds] = time.split(':');
    const [secs, millis] = seconds.split(',');
    return (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secs) + parseInt(millis) / 1000);
}

function playAudio() {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    source.onended = function() {
        clearInterval(matrixInterval);
    };
    displaySubtitles();
    displayMatrixText();
}

function displaySubtitles() {
    const interval = setInterval(() => {
        const currentTime = audioContext.currentTime;
        if (currentSubtitleIndex < subtitles.length && currentTime >= subtitles[currentSubtitleIndex].start) {
            document.getElementById('subtitlesContainer').innerText = subtitles[currentSubtitleIndex].text;
            currentSubtitleIndex++;
        }
        if (currentSubtitleIndex >= subtitles.length) {
            clearInterval(interval);
        }
    }, 100);
}

function displayMatrixText() {
    const matrixContainer = document.getElementById('matrixBackground');
    const columns = Math.floor(window.innerWidth / 20);
    const drops = Array(columns).fill(1);

    matrixInterval = setInterval(() => {
        matrixContainer.innerHTML = '';
        matrixContainer.style.color = '#00ff00';
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            const x = i * 20;
            const y = drops[i] * 20;
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            span.innerText = text;
            matrixContainer.appendChild(span);
            if (y > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 50);
}

function toggleFullScreen() {
    const container = document.querySelector('.container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', () => {
    const container = document.querySelector('.container');
    if (document.fullscreenElement) {
        container.classList.add('fullscreen');
    } else {
        container.classList.remove('fullscreen');
    }
});
