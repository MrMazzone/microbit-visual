import type { Feature } from '../types'

export const features: Feature[] = [
  {
    id: 'led-matrix',
    name: '5×5 LED Display',
    category: 'output',
    color: '#10B981',
    shortDescription: '25 individually programmable red LEDs',
    description:
      'The LED matrix is the primary way your Micro:bit communicates visually. All 25 LEDs can be controlled independently — you can display scrolling text, images, numbers, and animations. The brightness of each LED can be set from 0 (off) to 255 (full brightness).',
    technicalDetails: [
      '5 columns × 5 rows = 25 individual LEDs',
      'Software-controlled brightness (0–255 levels)',
      'Scanned row-by-row in software (persistence of vision)',
      'Can also act as a light level sensor when not displaying',
    ],
    funFacts: [
      '💡 The LEDs can double as a light sensor! When briefly switched off between display frames, the matrix measures ambient light — no extra hardware needed.',
      '🎨 Even with just 25 pixels you can display 26 letters, digits, and hundreds of custom icons.',
    ],
  },
  {
    id: 'button-a',
    name: 'Button A',
    category: 'input',
    color: '#3B82F6',
    shortDescription: 'Left-side programmable push button',
    description:
      'Button A is one of two main user-input buttons on the front of the Micro:bit. Your program can detect when it is pressed, released, or held down. You can also count how many times it has been pressed since the program started.',
    technicalDetails: [
      'Hardware debounce circuit (54 ms detection period)',
      'Detects: pressed, released, is-pressed (held)',
      'Can count total number of presses in software',
      'Works together with Button B for 4 input combinations',
    ],
    funFacts: [
      '🎮 Two buttons give you four possible combinations: A alone, B alone, A+B together, or neither — perfect for simple game controllers.',
      '⏱ The 54 ms debounce means even the fastest button-masher gets clean, reliable readings every time.',
    ],
  },
  {
    id: 'button-b',
    name: 'Button B',
    category: 'input',
    color: '#3B82F6',
    shortDescription: 'Right-side programmable push button',
    description:
      'Button B works exactly like Button A but sits on the right side of the board. Having two separate buttons lets you create much more expressive programs — use them as left/right controls, next/previous, yes/no, or anything you can imagine.',
    technicalDetails: [
      'Hardware debounce circuit (54 ms detection period)',
      'Detects: pressed, released, is-pressed (held)',
      'Can count total number of presses in software',
      'Combining A+B registers as a third distinct button event',
    ],
    funFacts: [
      '🎸 Micro:bit games on the playground often use A+B simultaneously as a "fire" or "select" action — three buttons for the price of two!',
      '🔬 The debounce circuit filters out the tiny electrical bounces that happen when metal contacts collide, giving you one clean signal per press.',
    ],
  },
  {
    id: 'accelerometer',
    name: 'Accelerometer',
    category: 'sensor',
    color: '#8B5CF6',
    shortDescription: 'Detects movement, tilt, and acceleration in 3D',
    description:
      'The accelerometer measures forces acting on the Micro:bit along three axes: left/right (X), forward/back (Y), and up/down (Z). It can detect gestures like shaking, tilting, falling, and even which way up the board is facing.',
    technicalDetails: [
      'Chip: LSM303AGR (shared with magnetometer)',
      '3-axis measurement: X, Y, Z',
      'Configurable range: ±2g / ±4g / ±8g / ±16g',
      'Connected via I²C bus to the processor',
      'Hardware gesture detection: shake, freefall, tap',
    ],
    funFacts: [
      '📱 Your smartphone uses the exact same technology to rotate its screen when you turn it sideways.',
      '✈️ "g-force" is a measure of acceleration relative to gravity. At rest on a desk, the Micro:bit reads exactly 1g pointing downward.',
    ],
  },
  {
    id: 'magnetometer',
    name: 'Compass / Magnetometer',
    category: 'sensor',
    color: '#8B5CF6',
    shortDescription: 'Measures magnetic field to find North',
    description:
      'The magnetometer lives on the same chip as the accelerometer and measures the strength and direction of nearby magnetic fields. After a short calibration spin, it works as a digital compass that can tell you which way is North.',
    technicalDetails: [
      'Chip: LSM303AGR (shared with accelerometer)',
      '3-axis magnetic field measurement',
      'Requires one-time calibration (tilt-to-draw a circle)',
      'Connected via I²C bus to the processor',
      'Can also detect nearby magnets and metal objects',
    ],
    funFacts: [
      '🧭 The calibration step (tilting the board to draw a circle of dots on screen) removes the magnetic interference from the board\'s own components.',
      '🔍 You can use the magnetometer as a metal detector — strong magnetic materials nearby will change the sensor readings noticeably.',
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature Sensor',
    category: 'sensor',
    color: '#8B5CF6',
    shortDescription: 'Measures ambient temperature in °C',
    description:
      'The temperature sensor is built directly into the nRF52833 processor chip. It measures the temperature of the chip itself, which closely tracks the surrounding air temperature. It is a great starting point for weather-station projects.',
    technicalDetails: [
      'Built into the nRF52833 processor core',
      'Range: −40°C to +105°C',
      'Resolution: 0.25°C steps',
      'Accuracy: approximately ±5°C',
      'No external hardware required',
    ],
    funFacts: [
      '🌡 Because the sensor is on the chip, a busy program running lots of calculations can slightly warm the processor and give readings a degree or two above room temperature.',
      '🌍 −40°C is one of the coldest temperatures ever recorded on Earth\'s surface (in Siberia and Canada), so the sensor covers almost every real-world environment.',
    ],
  },
  {
    id: 'microphone',
    name: 'Microphone',
    category: 'sensor',
    color: '#8B5CF6',
    shortDescription: 'Built-in MEMS microphone for sound detection (v2)',
    description:
      'Introduced in Micro:bit v2, the MEMS microphone can detect sound levels without any extra hardware. A built-in LED ring on the board lights up whenever the microphone is active. You can use it to react to clapping, music, or any loud noise.',
    technicalDetails: [
      'Chip: Knowles SPU0410LR5H-QB-7 MEMS microphone',
      'Sensitivity: −38 dB',
      'Signal-to-noise ratio: 63 dB',
      'Microphone active LED indicator on front of board',
      'Micro:bit v2 only (not available on v1)',
    ],
    funFacts: [
      '👏 You can write a clap-detector in just a few lines of MakeCode — the board will respond to claps but ignore quieter background noise.',
      '🔬 MEMS stands for Micro-Electro-Mechanical Systems — the microphone contains a tiny vibrating membrane etched from silicon, smaller than a grain of rice.',
    ],
  },
  {
    id: 'speaker',
    name: 'Speaker',
    category: 'output',
    color: '#10B981',
    shortDescription: 'Built-in buzzer speaker for tones and music (v2)',
    description:
      'The Micro:bit v2 added a built-in magnetic speaker so you can play sounds, melodies, and ringtones without connecting anything extra. It sits on the front of the board and is loud enough to hear in a quiet classroom.',
    technicalDetails: [
      'Chip: JIANGSU HUANENG MLT-8530',
      'Volume: 80 dB SPL at 5 V from 10 cm',
      'Magnetic (moving-coil) speaker type',
      'Micro:bit v2 only (not available on v1)',
      'Can also be driven from edge connector pin for external speaker',
    ],
    funFacts: [
      '🎵 The MakeCode editor includes a "Music" category that lets you compose full melodies using note blocks — try playing "Ode to Joy"!',
      '📻 80 dB is about as loud as a typical alarm clock — noticeable but not painful. For comparison, a whisper is around 30 dB.',
    ],
  },
  {
    id: 'bluetooth-radio',
    name: 'Bluetooth & Radio',
    category: 'connectivity',
    color: '#F59E0B',
    shortDescription: '2.4 GHz wireless — Bluetooth 5.1 and Micro:bit radio',
    description:
      'The Micro:bit has two wireless communication systems sharing the same 2.4 GHz antenna. Bluetooth Low Energy lets it talk to phones, tablets, and computers. The custom radio protocol lets Micro:bits talk directly to each other in a classroom — no phone or internet needed.',
    technicalDetails: [
      'Bluetooth 5.1 with BLE (Bluetooth Low Energy)',
      'Custom Micro:bit radio: 80 channels, 1–2 Mbps',
      'Standard radio payload: 32 bytes',
      'Reception sensitivity: −93 dBm',
      'Transmission power: −40 to +4 dBm (configurable)',
      'Antenna: PCB trace etched into the board',
    ],
    funFacts: [
      '📡 Two Micro:bits can communicate across a whole school corridor — typical indoor range is 20–30 metres.',
      '📱 The Micro:bit app on your phone uses Bluetooth to flash new programs wirelessly and show sensor data in real time.',
    ],
  },
  {
    id: 'processor',
    name: 'nRF52833 Processor',
    category: 'processor',
    color: '#06B6D4',
    shortDescription: 'The main ARM Cortex-M4 brain of the Micro:bit',
    description:
      'The nRF52833 from Nordic Semiconductor is the heart of the Micro:bit v2. It runs your MakeCode or MicroPython program, manages all the sensors, drives the LED display, and handles Bluetooth — all at the same time. It is also the chip that contains the temperature sensor.',
    technicalDetails: [
      'CPU: ARM Cortex-M4 32-bit with hardware floating-point unit',
      'Clock speed: 64 MHz',
      'Flash memory: 512 KB (stores your program)',
      'RAM: 128 KB (working memory while running)',
      'Also provides: Bluetooth, radio, USB interface, GPIO',
    ],
    funFacts: [
      '🚀 The Apollo 11 guidance computer that landed humans on the Moon ran at 0.043 MHz with 4 KB of RAM — the Micro:bit processor is roughly 1,500× faster with 32,000× more memory!',
      '⚡ Despite its power, the nRF52833 sips just a few milliamps of current — a pair of AAA batteries can keep it running for many hours.',
    ],
  },
  {
    id: 'edge-connector',
    name: 'Edge Connector',
    category: 'input',
    color: '#3B82F6',
    shortDescription: '25-pin gold-plated connector for external hardware',
    description:
      'The gold-plated strip at the bottom of the Micro:bit is how you connect it to the outside world. Five large rings (labelled 0, 1, 2, 3V, and GND) can be used with crocodile clips or banana plugs. The smaller pins require an edge connector breakout board.',
    technicalDetails: [
      '25 pins total (5 large rings + 20 smaller pins)',
      '19 assignable GPIO (General Purpose Input/Output) pins',
      '10-bit analogue-to-digital converter (ADC) on selected pins',
      'PWM (pulse-width modulation) output on selected pins',
      'Supports I²C, SPI, and UART serial protocols',
      'Pins 0, 1, and 2 support capacitive touch sensing',
    ],
    funFacts: [
      '🐊 The five large rings are spaced so you can clip standard crocodile (alligator) leads directly onto them — no soldering needed to get started.',
      '🤖 With a motor driver board plugged into the edge connector, you can turn your Micro:bit into the brain of a wheeled robot.',
    ],
  },
  {
    id: 'touch-pins',
    name: 'Touch-Sensitive Pins',
    category: 'input',
    color: '#3B82F6',
    shortDescription: 'Pins 0, 1, and 2 detect touch without a button',
    description:
      'The three large edge-connector rings labelled 0, 1, and 2 can sense human touch without pressing any button. When you hold the GND ring and touch one of the numbered rings, you complete a low-current circuit that the Micro:bit detects as a touch event.',
    technicalDetails: [
      'Capacitive touch sensing on pins 0, 1, and 2',
      'Requires completing the circuit via the GND ring',
      '10 MΩ weak pull-up resistors on sensing pins',
      'Works through thin gloves or with wet fingers',
      'Can also connect conductive materials (foil, graphite, fruit!)',
    ],
    funFacts: [
      '🍌 You can connect a banana to pin 0 with a crocodile clip and use it as a musical key — the slightly conductive fruit works as a touch sensor!',
      '🎹 This is the same underlying technology used in smartphone touchscreens — measuring tiny changes in capacitance as your finger approaches.',
    ],
  },
  {
    id: 'usb',
    name: 'USB Connector',
    category: 'power',
    color: '#EF4444',
    shortDescription: 'Micro-USB for power and drag-and-drop programming',
    description:
      'The Micro-USB connector at the bottom of the board has two jobs: it provides power from a computer or USB charger, and it is how you upload new programs. When plugged in, the Micro:bit appears as a USB flash drive — you just copy your .hex file onto it.',
    technicalDetails: [
      'USB 2.0 full-speed interface',
      'Mass Storage Class: appears as a USB drive (MICROBIT)',
      'CDC serial for live data and REPL (Python)',
      'CMSIS-DAP debug interface via SWD protocol',
      'Interface chip: second nRF52 processor handles USB protocol',
    ],
    funFacts: [
      '💾 Drag-and-drop programming was a deliberate design choice to make the Micro:bit work on any computer without installing drivers or special software.',
      '🔌 The interface processor (a second, hidden nRF52) bridges USB to the main chip — it also enables live data logging and serial communication with MicroPython.',
    ],
  },
  {
    id: 'battery',
    name: 'Battery Connector',
    category: 'power',
    color: '#EF4444',
    shortDescription: 'JST connector for 2×AAA battery pack',
    description:
      'The small JST connector on the bottom-left lets you power the Micro:bit from a portable battery pack — typically two AAA batteries in a holder. This is what makes Micro:bit projects truly wireless and wearable.',
    technicalDetails: [
      'Connector: 2-pin JST (PH series)',
      'Accepted voltage: 1.8 V – 3.6 V',
      'Two AAA batteries = approximately 3 V (perfect)',
      'Maximum current draw: 300 mA',
      'Automatic switching between USB and battery power',
    ],
    funFacts: [
      '🔋 Two AAA batteries power the Micro:bit for many hours — even with the radio and LEDs running continuously.',
      '👕 The battery connector is why Micro:bit projects can be sewn into clothing — there is no cable to a computer required once the program is loaded.',
    ],
  },
]

export function getFeatureById(id: string): Feature | undefined {
  return features.find((f) => f.id === id)
}
