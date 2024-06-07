const audioContext = new (window.AudioContext)();
const audioBuffers = new Map();
const audioSources = new Map();
const audioStates = new Map();  // Track whether each sound is playing or paused
const audioParams = new Map();  // Track the URL and loop state for each sound
const loopingSources = new Map(); // Track looping sources to handle manual looping
const volumeNodes = new Map();

const soundSprite: any = {
    url: 'sound/audioSprite.mp3',
    sounds: {
        "jq_multiplier_awarded": [
            0,
            3000
        ],
        "jq_multiplier_enhancement": [
            4000,
            3000
        ],
        "jq_mx_basegame": [
            8000,
            73411.76870748299
        ],
        "jq_mx_freegame_music_loop": [
            83000,
            60631.5873015873
        ],
        "jq_sq_coin_tick_up": [
            145000,
            2000
        ],
        "jq_sx_3_spins_message": [
            148000,
            4000
        ],
        "jq_sx_anticipation": [
            153000,
            4033.6281179138214
        ],
        "jq_sx_big_win_intro": [
            159000,
            2000
        ],
        "jq_sx_big_win_loop": [
            162000,
            4000
        ],
        "jq_sx_big_win_outro": [
            167000,
            2000
        ],
        "jq_sx_butterfly_collection": [
            170000,
            4500
        ],
        "jq_sx_butterfly_feature_activate": [
            176000,
            4000
        ],
        "jq_sx_butterfly_reveal": [
            181000,
            4500
        ],
        "jq_sx_butterfly_sit_meter": [
            187000,
            3000
        ],
        "jq_sx_buyin_button": [
            191000,
            1000
        ],
        "jq_sx_continue_button": [
            193000,
            1000
        ],
        "jq_sx_counter": [
            195000,
            1995.0113378684762
        ],
        "jq_sx_freegame_trigger": [
            198000,
            5000
        ],
        "jq_sx_generic_button": [
            204000,
            1000
        ],
        "jq_sx_golden_coin_awarded": [
            206000,
            3000
        ],
        "jq_sx_golden_coin_cash_reveal": [
            210000,
            3500
        ],
        "jq_sx_golden_queen_reveal": [
            215000,
            2500
        ],
        "jq_sx_level_up_message": [
            219000,
            3000
        ],
        "jq_sx_mega_win_intro": [
            223000,
            2000
        ],
        "jq_sx_mega_win_loop": [
            226000,
            4000
        ],
        "jq_sx_mega_win_outro": [
            231000,
            2000
        ],
        "jq_sx_reel_spin_loop": [
            234000,
            2000
        ],
        "jq_sx_reel_stop": [
            237000,
            1000
        ],
        "jq_sx_scatter_collection": [
            239000,
            3000
        ],
        "jq_sx_scatter_landing": [
            243000,
            2500
        ],
        "jq_sx_spin_button": [
            247000,
            1000
        ],
        "jq_sx_super_win_intro": [
            249000,
            2000
        ],
        "jq_sx_super_win_loop": [
            252000,
            4000
        ],
        "jq_sx_super_win_outro": [
            257000,
            2000
        ],
        "jq_sx_symbol_win_1": [
            260000,
            2500
        ],
        "jq_sx_symbol_win_2": [
            264000,
            2500
        ],
        "jq_sx_wild_landing": [
            268000,
            2500
        ],
        "jq_sx_win_sound_1": [
            272000,
            3000
        ],
        "jq_sx_symbol_win_3": [
            276000,
            2500
        ],
        "jq_sx_win_sound_2": [
            280000,
            3000
        ],
        "jq_sx_win_sound_3": [
            284000,
            3000
        ],
        "jq_sx_win_sound_4": [
            288000,
            3000
        ],
        "jq_mx_freegame_intro": [
            292000,
            5368.435374149669
        ],
        "jq_mx_freegame_outro": [
            299000,
            5052.630385487532
        ]
    }
}

async function loadSoundSprite(url: any) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);
    return buffer;
}

function resumeAudioContext() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

document.addEventListener('click', resumeAudioContext, { once: true });

function playSegment(id: any, buffer: any, offset: any, duration: any, loop: boolean, volume = 1.0) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    const volNode = audioContext.createGain();
    volNode.gain.value = volume;

    source.connect(volNode);
    volNode.connect(audioContext.destination);

    source.start(0, offset, duration);

    // Store the source and gain node with the given id
    audioSources.set(id, source);
    volumeNodes.set(id, volNode);
    audioStates.set(id, true);  // Mark as playing

    // If looping, schedule the next play
    if (loop) {
        const timeoutId = setTimeout(() => {
            playSegment(id, buffer, offset, duration, loop, volume);
        }, duration * 1000); // Convert duration to milliseconds

        loopingSources.set(id, timeoutId);
    }

    // Clean up on end
    source.onended = () => {
        if (!loop) {
            audioSources.delete(id);
            volumeNodes.delete(id);
            audioStates.delete(id);
            audioParams.delete(id);
        }
    };
}


export async function playSoundLoop(id: any, soundName: any, loop: any, volume = 1.0) {
    // Ensure the audio context is resumed
    resumeAudioContext();

    // Load the sound sprite if not already loaded
    if (!audioBuffers.has(soundSprite.url)) {
        const buffer = await loadSoundSprite(soundSprite.url);
        audioBuffers.set(soundSprite.url, buffer);
    }

    const buffer = audioBuffers.get(soundSprite.url);
    const sound = soundSprite.sounds[soundName];

    if (buffer && sound) {

        const offset = sound[0] / 1000;
        const duration = sound[1] / 1000;
        // const { start: offset, duration } = sound;
        playSegment(id, buffer, offset, duration, loop, volume);

        // Store the params for resuming
        audioParams.set(id, { soundName, loop, volume });
    }
}

export function stopSoundLoop(id: any) {
    const source = audioSources.get(id);
    if (source) {
        source.stop();
        source.disconnect();
    }

    // Clear any scheduled loops
    const timeoutId = loopingSources.get(id);
    if (timeoutId) {
        clearTimeout(timeoutId);
        loopingSources.delete(id);
    }

    audioSources.delete(id); // Remove the source from the map
    audioStates.delete(id);  // Remove the state
    audioParams.delete(id);  // Remove the params
}

// export function setVolume(id: any, volume: any) {
//     const gainNode = volumeNodes.get(id);
//     if (gainNode) {
//         gainNode.gain.value = volume;
//         // Update the volume in audioParams for resuming
//         const params = audioParams.get(id);
//         if (params) {
//             params.volume = volume;
//         }
//     }
// }

export function pauseAllSounds() {
    audioSources.forEach((source, id) => {
        if (audioStates.get(id)) {
            source.stop();
            audioStates.set(id, false);  // Mark as paused

            // Clear any scheduled loops
            const timeoutId = loopingSources.get(id);
            if (timeoutId) {
                clearTimeout(timeoutId);
                loopingSources.delete(id);
            }
        }
    });
}

export async function resumeAllSounds() {
    for (const [id, params] of audioParams) {
        if (!audioStates.get(id)) {
            const { soundName, loop, volume } = params;
            await playSoundLoop(id, soundName, loop, volume);
        }
    }
}

// Ensure the audio context is resumed on any user interaction
['click', 'touchstart'].forEach(event => {
    document.body.addEventListener(event, resumeAudioContext, { once: true });
});

// Pause sounds when tab is hidden, resume when visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseAllSounds();
    } else {
        resumeAllSounds();
    }
});
