// import { frameworkSound } from "@bonanzainteractive/core"
import { frameworkSound } from "../../../core/sounds/configuration/soundconfiguration"
// import soundSprite from "./soundSprite.json";
import soundSprite from "./audioSprite.json";


frameworkSound.data = {
    sfx: {
        // "bigWinLoop": { id: "bigWinLoop", loop: false, vol: 0.1 },
        // "superWinLoop": { id: "superWinLoop", loop: false, vol: 0.1 },
        // "megaWinLoop": { id: "megaWinLoop", loop: false, vol: 0.1 },
        // "ultraWinLoop": { id: "ultraWinLoop", loop: false, vol: 0.1 },

        // "blastSound1": { id: "spinStopSound", loop: false, vol: 0.7 },
        // "blastSound2": { id: "spinStopSound", loop: false, vol: 0.7 },
        // "blastSound3": { id: "spinStopSound", loop: false, vol: 0.7 },
        // "blastSound4": { id: "spinStopSound", loop: false, vol: 0.7 },

        // "symbolLandingSound": { id: "symbolLandingSound", loop: false, vol: 1 },

        // "spinSound1": { id: "spinSound1", loop: true, vol: 0.2 },
        // "spinSound2": { id: "spinSound2", loop: true, vol: 0.2 },
        // "spinSound3": { id: "spinSound3", loop: true, vol: 0.2 },
        // "spinSound4": { id: "spinSound4", loop: true, vol: 0.2 },

        // "scatterLanding1": { id: "scatterLanding1", loop: true, vol: 0.8 },
        // "scatterLanding2": { id: "scatterLanding2", loop: true, vol: 0.8 },
        // "scatterLanding3": { id: "scatterLanding3", loop: true, vol: 0.8 },
        // "scatterLanding4": { id: "scatterLanding4", loop: true, vol: 0.8 },


        // "featureTriggerSound": { id: "featureTriggerSound", loop: false, vol: 0.7 },
        // "freeGameEnterSound": { id: "freeGameEnterSound", loop: false, vol: 0.7 },
        // "anticipationSound": { id: "anticipationSound", loop: false, vol: 0.7 },
        // "reelStoppingSound": { id: "reelStoppingSound", loop: false, vol: 0.7 },
        // "spinButtonSound": { id: "spinButtonSound", loop: false, vol: 0.7 },
        // "multiplierSound": { id: "multiplierSound", loop: false, vol: 0.7 },
        // "reTriggerBlastSound": { id: "reTriggerBlastSound", loop: false, vol: 0.7 },

        // "winShowerSound": { id: "winShowerSound", loop: true, vol: 1 },
        // "winCelebrationStartSound": { id: "winCelebrationStartSound", loop: false, vol: 1 },
        // "winCelebrationStartSoundBell": { id: "winCelebrationStartSoundBell", loop: false, vol: 1 },
        // "winShowerBgSound": { id: "winShowerBgSound", loop: false, vol: 1 },
      
        // sound for junlge Queen
        // "mw_sx_general_click": { id: "mw_sx_general_click", loop: false, vol: 1 },
        // "mw_sx_spin_button_click": { id: "mw_sx_spin_button_click", loop: false, vol: 1 },
        // "mw_sx_reel_spin_loop_2.5s": { id: "mw_sx_reel_spin_loop_2.5s", loop: false, vol: 1 },//Reel run-2.5sec
        // "mw_sx_reel_stop": { id: "mw_sx_reel_stop", loop: false, vol: 1 },//Reel stop
	    // "mw_sx_freespin_trigger": { id: "mw_sx_freespin_trigger", loop: false, vol: 1 },
        // "Level_Upgrade_FreeGames_audio": { id: "Level_Upgrade_FreeGames_audio", loop: false, vol: 1 },
        // "Multiplier_Upgrade_audio": { id: "Multiplier_Upgrade_audio", loop: false, vol: 1 },
        // "Mystery_Symbol_Collection_audio": { id: "Mystery_Symbol_Collection_audio", loop: false, vol: 1 },
        // "Mystery_Symbol_Reveal_audio": { id: "Mystery_Symbol_Reveal_audio", loop: false, vol: 1 },
        // "Golden_coin_Feature_Trigger_audio": { id: "Golden_coin_Feature_Trigger_audio", loop: false, vol: 1 },
        // "Golden_coin_Spinning_audio": { id: "Golden_coin_Spinning_audio", loop: false, vol: 1 },
        // "Coin_Prize_Collection_audio": { id: "Coin_Prize_Collection_audio", loop: false, vol: 1 },
        // "mw_sx_counter": { id: "mw_sx_counter", loop: true, vol: 1 },
        //@LatestAudio for JQ
        "jq_sx_continue_button": { id: "jq_sx_continue_button", loop: false, vol: 1 },
        "jq_sx_generic_button": { id: "jq_sx_generic_button", loop: false, vol: 1 },
        "jq_sx_buyin_button": { id: "jq_sx_buyin_button", loop: false, vol: 1 },
        "jq_sx_spin_button": { id: "jq_sx_spin_button", loop: false, vol: 1 },
        "jq_sx_reel_stop": { id: "jq_sx_reel_stop", loop: false, vol: 1 },
        "jq_sx_reel_spin_loop": { id: "jq_sx_reel_spin_loop", loop: false, vol: 0.2 },
        "jq_sx_scatter_collection": { id: "jq_sx_scatter_collection", loop: false, vol: 1 },
        "jq_sx_scatter_landing": { id: "jq_sx_scatter_landing", loop: false, vol: 1 },
        "jq_sx_wild_landing": { id: "jq_sx_wild_landing", loop: false, vol: 1 },
        "jq_sx_freegame_trigger": { id: "jq_sx_freegame_trigger", loop: false, vol: 1 }, 
        "jq_mx_freegame_intro": { id: "jq_mx_freegame_intro", loop: false, vol: 1 },
        "jq_mx_freegame_outro": { id: "jq_mx_freegame_outro", loop: false, vol: 1 },
        "jq_sx_butterfly_sit_meter": { id: "jq_sx_butterfly_sit_meter", loop: false, vol: 1 },
        "jq_sx_butterfly_collection": { id: "jq_sx_butterfly_collection", loop: false, vol: 1 },
        "jq_sx_butterfly_feature_activate": { id: "jq_sx_butterfly_feature_activate", loop: false, vol: 1 },
        "jq_sx_butterfly_reveal": { id: "jq_sx_butterfly_reveal", loop: false, vol: 1 },
        "jq_sx_golden_coin_awarded": { id: "jq_sx_golden_coin_awarded", loop: false, vol: 1 },
        "jq_sx_golden_coin_cash_reveal": { id: "jq_sx_golden_coin_cash_reveal", loop: false, vol: 1 },
        "jq_sx_golden_queen_reveal": { id: "jq_sx_golden_queen_reveal", loop: false, vol: 1 },
        "jq_sx_3_spins_message": { id: "jq_sx_3_spins_message", loop: false, vol: 1 }, 
        "jq_sx_level_up_message": { id: "jq_sx_level_up_message", loop: false, vol: 1 },
        "jq_multiplier_enhancement": { id: "jq_multiplier_enhancement", loop: false, vol: 1 },
        "jq_multiplier_awarded": { id: "jq_multiplier_awarded", loop: false, vol: 1 },
        "jq_sx_symbol_win_1": { id: "jq_sx_symbol_win_1", loop: false, vol: 1 },
        "jq_sx_symbol_win_2": { id: "jq_sx_symbol_win_2", loop: false, vol: 1 },
        "jq_sx_symbol_win_3": { id: "jq_sx_symbol_win_3", loop: false, vol: 1 },
        "jq_sq_coin_tick_up": { id: "jq_sq_coin_tick_up", loop: false, vol: 1 },
        "jq_sx_counter": { id: "jq_sx_counter", loop: true, vol: 1 },
        "jq_sx_win_sound_1": { id: "jq_sx_win_sound_1", loop: false, vol: 1 },
        "jq_sx_win_sound_2": { id: "jq_sx_win_sound_2", loop: false, vol: 1 },
        "jq_sx_win_sound_3": { id: "jq_sx_win_sound_3", loop: false, vol: 1 },
        "jq_sx_big_win_intro": { id: "jq_sx_big_win_intro", loop: true, vol: 1 },
        "jq_sx_big_win_loop": { id: "jq_sx_big_win_loop", loop: true, vol: 1 },
        "jq_sx_big_win_outro": { id: "jq_sx_big_win_outro", loop: true, vol: 1 },
        "jq_sx_super_win_intro": { id: "jq_sx_super_win_intro", loop: true, vol: 1 },
        "jq_sx_super_win_loop": { id: "jq_sx_super_win_loop", loop: true, vol: 1 },
        "jq_sx_super_win_outro": { id: "jq_sx_super_win_outro", loop: true, vol: 1 },
        "jq_sx_mega_win_intro": { id: "jq_sx_mega_win_intro", loop: true, vol: 1 },
        "jq_sx_mega_win_loop": { id: "jq_sx_mega_win_loop", loop: true, vol: 1 },
        "jq_sx_mega_win_outro": { id: "jq_sx_mega_win_outro", loop: true, vol: 1 },
        "jq_sx_anticipation": { id: "jq_sx_anticipation", loop: true, vol: 1 },

        // "mw_sx_winsound_1": { id: "mw_sx_winsound_1", loop: true, vol: 1 },
        // "jq_sx_small_win": { id: "jq_sx_small_win", loop: false, vol: 1 },

    },
    bg: {
        "jq_mx_basegame": { id: "jq_mx_basegame", loop: true, vol: 1 },
        "jq_mx_freegame_music_loop": { id: "jq_mx_freegame_music_loop", loop: true, vol: 1 },

    },
    srcPath: soundSprite["urls"],
    spriteData: soundSprite["sprite"]
}
