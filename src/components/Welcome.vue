<template>
  <div>
    <span class="wordBox" id="typewriter" v-html="spanData"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spanData: '',
      current: 0,
      x: 0,
      speed: 100,
      speed2: 10000,
      typ: []
    }
  },
  created() {
    this.start()
  },
  methods: {
    start() {
      this.typ[0] = '1) Do you have a map? Because I just keep losing in your eyes.<br/><br/>' +
        '2) Meeting you was fate,and falling in love with you was out of my control.<br/><br/>' +
        '3) No man or woman is worth your tears and the one who is,won\'t make your cry.<br/><br/>' +
        '4) There are two reasons why I wake up in the morning: my alarm clock and you.<br/><br/>' +
        '5) You are everything to me, and I was so blessed when god sent you here for me<br/><br/>' +
        '6) In spite of you and me and the silly world going to pieces around us,I love you.<br/><br/>' +
        '7) If I could rearrange the alphabet,I\'d put Y and I together.<br/><br/>' +
        '8) It\'s not being in love that makes me happy, but is being in loving with you.<br/><br/>' +
        '9) There are 4 steps to happiness: 1 you 2 me 3 our hearts 4 together<br/><br/>' +
        '10) Love you so I don`t wanna go to sleep, for reality is better than a dream.<br/><br/>'
      this.typewrite()
    },
    typewrite() {
      const m = this.typ[this.current]
      this.spanData = m.substring(0, this.x++) +
        '_'
      if (this.x === m.length + 1) {
        this.x = 0
        this.current++
        if (this.current > this.typ.length - 1) {
          this.current = 0
        }
      } else {
        setTimeout(() => {
          this.typewrite()
        }, this.speed
        )
      }
    }
  }
}
</script>

<style scoped>
.wordBox {
  color: green;
}
</style>
