import { Audio } from 'expo-av';

let beepSound: Audio.Sound | null = null;
let finalBeepSound: Audio.Sound | null = null;

export async function loadSounds(): Promise<void> {
  const { sound: beep } = await Audio.Sound.createAsync(
    require('../../assets/beep.wav')
  );
  beepSound = beep;

  const { sound: finalBeep } = await Audio.Sound.createAsync(
    require('../../assets/beep-final.wav')
  );
  finalBeepSound = finalBeep;
}

export async function playBeep(): Promise<void> {
  if (beepSound) {
    await beepSound.setPositionAsync(0);
    await beepSound.playAsync();
  }
}

export async function playFinalBeep(): Promise<void> {
  if (finalBeepSound) {
    await finalBeepSound.setPositionAsync(0);
    await finalBeepSound.playAsync();
  }
}

export async function unloadSounds(): Promise<void> {
  if (beepSound) {
    await beepSound.unloadAsync();
    beepSound = null;
  }
  if (finalBeepSound) {
    await finalBeepSound.unloadAsync();
    finalBeepSound = null;
  }
}
