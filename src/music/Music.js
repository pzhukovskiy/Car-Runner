import { Howl } from "howler";
import backgroundMusic from '../../assets/sounds/music.mp3';
import coin_1 from '../../assets/sounds/coin_1.mp3';
import coin_2 from '../../assets/sounds/coin_2.mp3';
import coin_3 from '../../assets/sounds/coin_3.mp3';
import coin_4 from '../../assets/sounds/coin_4.mp3';
import crush from '../../assets/sounds/crush.mp3';

let isPlay = false;

const sound = new Howl({
  src: [backgroundMusic],
  loop: true,
  volume: 0.35,
  autoplay: true
});

const coin_1_music = new Howl({
    src: [coin_1],
    volume: 0.5,
});

const coin_2_music = new Howl({
  src: [coin_2],
  volume: 0.5,
});

const coin_3_music = new Howl({
  src: [coin_3],
  volume: 0.5,
});

const coin_4_music = new Howl({
  src: [coin_4],
  volume: 0.5,
});

const crush_music = new Howl({
  src: [crush],
  volume: 0.5,
})

export function soundPlay() {
  isPlay = !isPlay;
  (isPlay) ? sound.play() : sound.pause();
}

export {sound, coin_1_music, coin_2_music, coin_3_music, coin_4_music, crush_music}