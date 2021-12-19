<template>
   <v-app>
      <v-item-group>
         <v-container>
            <v-row align="center" justify="center">
               <v-col cols="6" md="6">
                  <v-item>
                     <v-card
                        :color="selected ? 'primary' : ''"
                        class="d-flex align-center"
                        dark
                        height="120"
                        @click="toggle"
                     >
                        <v-row justify="center">
                           <v-list-item two-line>
                              <v-list-item-content>
                                 <v-list-item-title>Привет!</v-list-item-title>
                                 <v-list-item-subtitle>
                                    <br />
                                    Добро пожаловать в новый тренировочный день.<br />
                                    <span v-if="resultGame.length > 0">
                                       Предыдущий результат: <br />
                                       {{ resultGame }}
                                    </span>
                                 </v-list-item-subtitle>
                              </v-list-item-content>
                           </v-list-item>
                        </v-row>
                     </v-card>
                  </v-item>

                  <v-item>
                     <v-card
                        :color="selected ? 'primary' : ''"
                        class="d-flex align-center"
                        dark
                        height="300"
                        style="margin-top: 7px"
                        @click="toggle"
                     >
                        <v-row justify="center">
                           <v-list-item-content>
                              <v-list-item-title>Настройки</v-list-item-title>

                              <v-list-item-subtitle>
                                 <br />
                                 <input
                                    type="range"
                                    min="1"
                                    max="15"
                                    step="1"
                                    v-model="duration"
                                 />
                                 <br />
                                 Длительность: {{ duration }}
                                 <br />
                                 <br />
                                 <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    v-model="level"
                                 />
                                 <br />
                                 Сложность: {{ level }}
                                 <br />
                                 <br />
                                 <div class="chekbox">
                                    <input type="checkbox" v-model="operations.addition" />
                                    <label for="scales">Суммирование</label>
                                 </div>
                                 <div class="chekbox">
                                    <input type="checkbox" v-model="operations.difference" />
                                    <label for="scales">Разность</label>
                                 </div>
                                 <div class="chekbox">
                                    <input type="checkbox" v-model="operations.multiplication" />
                                    <label for="scales">Умножение</label>
                                 </div>
                                 <div class="chekbox">
                                    <input type="checkbox" v-model="operations.division" />
                                    <label for="scales">Деление</label>
                                 </div>
                                 <div class="chekbox">
                                    <input type="checkbox" v-model="operations.exponentiation" />
                                    <label for="scales">Возведение в степень</label>
                                 </div>
                              </v-list-item-subtitle>
                           </v-list-item-content>
                        </v-row>
                     </v-card>
                  </v-item>

                  <v-row justify="center">
                     <v-btn class="start" @click="start">Начать тренировку</v-btn>
                  </v-row>
               </v-col>
            </v-row>
         </v-container>
      </v-item-group>
   </v-app>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
   name: "Settings",
   setup() {
      const router = useRouter();
      const readersNumber = ref(0);
      const book = ref("");
      const duration = ref(5);
      const level = ref(1);
      const operations = [
         "addition",
         "difference",
         "multiplication",
         "division",
         "exponentiation",
      ];
      const resultGame = ref(localStorage.getItem("resultGame") || "");

      function start() {
         let _oper = [];
         if (operations.addition) _oper.push("addition");
         if (operations.difference) _oper.push("difference");
         if (operations.multiplication) _oper.push("multiplication");
         if (operations.division) _oper.push("division");
         if (operations.exponentiation) _oper.push("exponentiation");

         if (_oper.length === 0) {
            alert("Не выбраны операции");
            return;
         }

         router.push({
            name: "game",
            params: {
               time: duration.value,
               level: level.value,
               operations: _oper,
            },
         });
      }

      return {
         readersNumber,
         book,
         duration,
         level,
         operations,
         start,
         resultGame,
      };
   },
};
</script>

<style>
.chekbox {
   margin-top: 10px;
}
.start {
   margin-top: 20px;
}
</style>