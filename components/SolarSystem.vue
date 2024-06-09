<template>
  <div class="container">
    <div class="sun" />
    <div class="earth">
      <div class="moon" />
    </div>
  </div>
</template>

<style scoped>
/**
 * Credit to [@astak16](https://github.com/astak16)
 * @see https://github.com/astak16/animation-css
 */

.container {
  position: absolute;
  top: 6em;
  z-index: -1;
  height: 30em;
  width: 30em;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: move 3000s linear infinite;
}
.sun {
  height: 6em;
  width: 6em;
  border-radius: 50%;
  background: radial-gradient(circle, #ffdf00, #ff9500);
  box-shadow:
    0 0 20px #ffdf00,
    0 0 40px #ff9500,
    0 0 60px #ff9500;
  position: relative;
  animation: blinking 2s linear infinite alternate;
}
.moon,
.earth {
  border-color: white transparent;
  border-style: solid;
  border-width: 1px 1px 0 0;
  border-radius: 50%;
  position: absolute;
}
.earth {
  height: 24em;
  width: 24em;
  animation: round 36.5s linear infinite;
}
.earth::before {
  content: '';
  width: 4em;
  height: 4em;
  background: radial-gradient(circle, #2a9d8f, #264653);
  box-shadow: 0 0 10px #2a9d8f;
  border-radius: 50%;
  position: absolute;
  top: 1.5em;
  right: 2.5em;
}
.moon {
  height: 10em;
  width: 10em;
  position: absolute;
  top: -1em;
  right: 0;
  animation: round 2s linear infinite;
}
.moon::before {
  content: '';
  width: 1em;
  height: 1em;
  background: gray;
  border-radius: 50%;
  position: absolute;
  top: 1em;
  right: 1em;
}
@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(calc(100vw - 50px), calc(100vh - 50px));
  }
  40% {
    transform: translate(calc(100vw - 50px), 0);
  }
  60% {
    transform: translate(0, calc(100vh - 50px));
  }
  80% {
    transform: translate(calc(50vw - 25px), calc(50vh - 25px));
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes round {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes blinking {
  to {
    box-shadow:
      0 0 20px #f0da30,
      0 0 30px #f1c88d,
      0 0 40px #f8e9d5;
  }
}
</style>
