<template>
  <v-item-group>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6" md="6">
          <v-item>
            <v-card
              :color="selected ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="70"
              style="margin-top: 7px"
              @click="toggle"
            >
              <v-row
                justify="space-between"
                style="padding: 10px 30px 10px 30px"
              >
                <v-btn @click="end">Отмена</v-btn>
                <span> Вопрос {{ question.id + 1 }} </span>
                <v-btn v-if="time != 0">{{ getTime }}</v-btn>
                <v-btn color="error" v-else>Время истекло!</v-btn>
              </v-row>
            </v-card>
          </v-item>

          <v-item>
            <v-card
              :color="selected ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="100"
              style="margin-top: 7px"
              @click="toggle"
            >
              <v-row justify="center">
                <div>
                  <input
                    input
                    v-model="question.one"
                    disabled
                    class="question_input"
                  />
                  <span> {{ question.operDisp }}</span>
                  <input
                    v-model="question.two"
                    type="number"
                    class="question_input"
                    id="question_input_one"
                    refs="theComponent"
                    @click="click(1)"
                    placeholder="_______"
                  />
                  <span> {{ question.operDisp }}</span>
                  <input
                    v-model="question.three"
                    type="number"
                    class="question_input"
                    id="question_input_two"
                    @click="click(2)"
                    placeholder="_______"
                  />
                  <span>=</span>
                  <input
                    v-model="question.result"
                    disabled
                    class="question_input"
                  />
                </div>
              </v-row>
            </v-card>
          </v-item>

          <v-item>
            <v-card
              :color="selected ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="260"
              style="margin-top: 7px"
              @click="toggle"
            >
              <v-row justify="center">
                <table>
                  <tr>
                    <td v-for="num in [1, 2, 3]" :key="num">
                      <v-btn
                        color="orange"
                        elevation="15"
                        @click="clickNum($event, num)"
                      >
                        {{ num }}
                      </v-btn>
                    </td>
                    <td>
                      <v-btn color="grey" elevation="15" @click="click(1)"
                        >&lt;</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td v-for="num in [4, 5, 6]" :key="num">
                      <v-btn
                        color="orange"
                        elevation="15"
                        @click="clickNum($event, num)"
                        >{{ num }}</v-btn
                      >
                    </td>
                    <td>
                      <v-btn color="grey" elevation="15" @click="click(2)"
                        >></v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td v-for="num in [7, 8, 9]" :key="num">
                      <v-btn
                        color="orange"
                        elevation="15"
                        @click="clickNum($event, num)"
                        >{{ num }}</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td v-for="num in [0]" :key="num">
                      <v-btn
                        color="orange"
                        elevation="15"
                        @click="clickNum($event, num)"
                        >{{ num }}</v-btn
                      >
                    </td>
                    <td></td>
                    <td>
                      <v-btn
                        color="grey"
                        elevation="2"
                        :disabled="continueDisabled"
                        @click="answer"
                        >=</v-btn
                      >
                    </td>
                  </tr>
                </table>
              </v-row>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Game",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const _time = route.params.time;
    const _level = route.params.level;
    const operations = route.params.operations;
    const question = ref({
      id: 0,
      oper: "",
      operDisp: "",
      result: 0,
      one: 0,
      two: 0,
      three: 0,
    });
    let answer_Success = 0;
    let answer_Failed = 0;
    let current_active_input = 1;

    let time = ref(_time * 60);
    let timer = setInterval(() => {
      time.value -= 1;
      if (time.value === 0) {
        clearInterval(timer);
        finish();
      }
    }, 1000);

    // Массив с задачами
    const getMaxResult = (level) => {
      let _res = 1;
      for (let index = 0; index < level; index++) {
        _res = _res * 10;
      }
      return _res;
    };

    let questionsArr = [];
    let ii = 0;
    operations.forEach((oper) => {
      let operDisp = "";
      if (oper === "addition") operDisp = "+";
      if (oper === "difference") operDisp = "-";
      if (oper === "multiplication") operDisp = "*";
      if (oper === "division") operDisp = "/";
      if (oper === "exponentiation") operDisp = "^2";

      for (let index = 0; index < 5; index++) {
        let resultItem = Math.floor(Math.random() * getMaxResult(_level));
        let oneVariable = Math.floor(1 + Math.random() * (resultItem - 1));
        questionsArr.push({
          id: ii,
          oper: oper,
          operDisp: operDisp,
          result: resultItem,
          one: oneVariable,
          two: 0,
          three: 0,
        });
        ii++;
      }
    });

    question.value = questionsArr[0];

    function end() {
      router.push({ name: "home" });
    }

    const getTime = computed(() =>
      new Date(time.value * 1000).toISOString().substr(14, 5)
    );

    function finish() {
      let resultGame = `Игра завершена \nРезультат: \nправильных = ${answer_Success} \nнеправильных = ${answer_Failed}`;
      alert(resultGame);
      localStorage.setItem(
        "resultGame",
        resultGame.replace("Игра завершена \nРезультат: \n", "")
      );
      end();
    }

    function clickNum(event, num) {
      if (current_active_input === 1) {
        if (question.value.two != 0) {
          question.value.two = Number(
            question.value.two.toString() + num.toString()
          );
        } else {
          question.value.two = Number(num);
        }
      } else if (current_active_input === 2) {
        if (question.value.three != 0) {
          question.value.three = Number(
            question.value.three.toString() + num.toString()
          );
        } else {
          question.value.three = Number(num);
        }
      } else {
      }
    }

    function click(btn) {
      current_active_input = btn;
    }

    function answer() {
      let curId = question.value.id;
      let nextId = curId + 1;

      {
        // valid
        if (question.value.oper === "addition") {
          question.value.one + question.value.two + question.value.three ===
          question.value.result
            ? answer_Success++
            : answer_Failed++;
        }

        if (question.value.oper === "difference") {
          question.value.one - question.value.two - question.value.three ===
          question.value.result
            ? answer_Success++
            : answer_Failed++;
        }

        if (question.value.oper === "multiplication") {
          let resultMultiplication = question.value.one;

          if (question.value.two != 0)
            resultMultiplication * question.value.two;
          if (question.value.three != 0)
            resultMultiplication * question.value.three;

          resultMultiplication === question.value.result
            ? answer_Success++
            : answer_Failed++;
        }

        if (question.value.oper === "division") {
          let resultDivision = question.value.one;

          if (question.value.two != 0) resultDivision / question.value.two;
          if (question.value.three != 0) resultDivision / question.value.three;

          resultDivision === question.value.result
            ? answer_Success++
            : answer_Failed++;
        }

        if (question.value.oper === "exponentiation") {
          let resultExponentiation = question.value.one;

          if (question.value.two != 0)
            resultExponentiation = Math.pow(
              resultExponentiation,
              question.value.two
            );
          if (question.value.three != 0)
            resultExponentiation = Math.pow(
              resultExponentiation,
              question.value.three
            );

          resultExponentiation === question.value.result
            ? answer_Success++
            : answer_Failed++;
        }
      }

      // next
      if (nextId != ii) {
        question.value = questionsArr[nextId];
        click(1);
      } else {
        finish();
      }
    }

    return {
      end,
      time,
      getTime,
      question,
      answer,
      clickNum,
      click,
    };
  },
};
</script>

<style>
td {
  width: 80px;
}
tr {
  height: 50px;
}
.question_input {
  width: 80px;
  margin-left: 10px;
  text-align: center;
}

.question_input:focus {
  outline: none !important;
  border: 1px solid black;
  box-shadow: 0 0 10px #719ece;
}
</style>