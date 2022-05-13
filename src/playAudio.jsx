import enterKey from "./audio/mixkit-hard-single-key-press-in-a-laptop-2542.wav"
import alphabetKey from "./audio/mixkit-single-key-type-2533.wav"


function playAudio(m, keyType) {
    // const key = m.slice(-1); // if u don't wanna to use keyType to differ songs, u can use a key param
    let audio = null
    switch (keyType) {
        default: {
            audio = new Audio(alphabetKey);
            
        }
        case ("enter"): {
            audio = new Audio(enterKey);
        }
        
}
audio.play()
}

export default playAudio