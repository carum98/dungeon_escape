export class Sound {
    static name = {
        'attack': 'attack',
        'diamond': 'hurt',
        'player_hurt': 'player_hurt',
        'enemy_hurt': 'enemy_hurt',
        'heart': 'heart',
    }

    static #sounds = {
        [Sound.name.attack]: new Audio('./assets/sounds/attack.mp3'),
        [Sound.name.diamond]: new Audio('./assets/sounds/diamond.mp3'),
        [Sound.name.heart]: new Audio('./assets/sounds/heart.mp3'),
        [Sound.name.player_hurt]: new Audio('./assets/sounds/player_hurt.mp3'),
        [Sound.name.enemy_hurt]: new Audio('./assets/sounds/enemy_hurt.mp3'),
    }

    static play(name) {
        const sound = Sound.#sounds[name]

        if (!sound) return

        sound.volume = 0.1
        sound.currentTime = 0
        sound.play()
    }

    static stop(name) {
        const sound = Sound.#sounds[name]

        if (!sound) return

        sound.pause()
        sound.currentTime = 0
    }
}