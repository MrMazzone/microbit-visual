# BBC Micro:bit Explorer

An interactive, single-page web app that lets students explore the hardware components of the BBC Micro:bit by clicking directly on a visual diagram of the board.

Built for the **Hello World Technical Curriculum Developer skills task** — Option 3: Build a short interactive web experience.

Try the live web app here: 

---

## About This Project

The Micro:bit is a common entry point for physical computing in K–12 CS, but students often use it without understanding what's actually on the board. This tool bridges that gap by making the hardware itself the interface.

Students click any component on a realistic SVG diagram of the Micro:bit v2 — buttons, the LED matrix, the accelerometer, the Bluetooth antenna, the edge connector — and a panel slides in with a plain-language description, technical specs, and two "Did You Know?" facts designed to spark curiosity and connect the hardware to things students already know (smartphones, compasses, alarm clocks).

The goal was to design something that rewards exploration. There's no correct path through it. Students discover components at their own pace, and every click delivers a small payoff.

---

## Design Decisions

**The board is the navigation.** Rather than a list or a slideshow, the Micro:bit diagram *is* the menu. This keeps the hardware front and center and makes the experience feel more like hands-on discovery than a reading exercise.

**Plain language first, specs second.** Each component opens with a one-sentence description a student could understand before they see any technical detail. The specs are there for students (or teachers) who want to go deeper.

**Fun facts as hooks.** Each component includes two facts written to land a moment of surprise — connecting the sensor to a real-world analogy or a memorable comparison. ("The Apollo 11 guidance computer ran at 0.043 MHz — the Micro:bit processor is roughly 1,500× faster.")

**Quick-access buttons below the board.** Students who aren't sure what they're looking at on the diagram can use the labeled buttons at the bottom to jump directly to any component. Both paths lead to the same content.

---

## How It Was Built

- With the help of **Claude Code**
- **React + TypeScript** via Vite
- **Pure SVG** for the board — no images, fully scalable and accessible
- **CSS animations** for the LED matrix idle cycle (heart → smiley → tick → diamond)
- **Tailwind CSS** for layout and panel styling
- No backend, no external dependencies at runtime — everything ships as a static bundle

The SVG board is designed match the real Micro:bit v2 layout, including the LSM303AGR motion sensor chip, JST battery connector, USB contacts, speaker mesh, and edge connector pin labelling.

It is not perfect, but with more time it could be refined to be a closer match.

---

## Running Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Components Covered

| Component | Category |
|-----------|----------|
| 5×5 LED Display | Output |
| Button A & Button B | Input |
| Accelerometer | Sensor |
| Compass / Magnetometer | Sensor |
| Temperature Sensor | Sensor |
| Microphone | Sensor |
| Speaker | Output |
| Bluetooth & Radio | Connectivity |
| nRF52833 Processor | Processor |
| Edge Connector | Input |
| Touch-Sensitive Pins | Input |
| USB Connector | Power |
| Battery Connector | Power |
