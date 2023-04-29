<template>
  <div class="app-cart">
 
    <p class="app-cart-cart">Корзина</p> 
    <p class="app-cart-cart" @click="goToTheCatalog" > &lt;--- Вернуться в каталог</p>
    <p v-if="cartList.length==0" class="app-cart-empty-cart">Корзина пуста</p>
    <div class="app-cart-wrapper"> 
      <div class="app-cart-list">
        <div 
          class="app-cart-item"
          v-for="item in cartList"
          :key="item.id">
          <div class="app-cart-left-side">
            <img class="app-cart-image" :src=item.image :alt=item.name>
            <div class="app-cart-change-count">
              <img 
              @click="decrease(item.id)" 
              class="app-cart-minus" 
              src="../images/minus.svg"
              >
              <p class="app-cart-count"> {{ item.countInCart }} </p>
              <img 
              @click="increase(item.id)"
              class="app-cart-plus" 
              src="../images/plus.svg"
              >
            </div>
          </div>
          <div class="app-cart-central-side">
            <div class="app-cart-name"> {{ item.name }}</div>
            <div class="app-cart-price">{{ item.currentPrice }} &#8381;</div>
          </div>
          <div class="app-cart-right-side">
            <img 
            @click="deleteItem(item.id)"
            class="app-cart-icon-delete" 
            src="../images/Delete.svg" 
            alt="delete">
            <div class="app-cart-totalSum">{{ item.currentPrice*item.countInCart }} &#8381;</div>
          </div>
        </div>
      </div>
      <div v-if="cartList.length>0" class="app-cart-block-total">
        <div class="app-cart-total">
          <p>ИТОГО</p>
          <p>{{ totalCart}} &#8381;</p>
        </div>
        <div class="app-cart-black-part">
          <p>Перейти к оформлению</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>




export default {
  name: 'AppCart',

  data(){
    return{
        cartList: [],
        totalCart:0,
        countCart:0,
        componentHeight:"100%"
    }
  },
  mounted(){
    this.getDataFromSessionStorage()
    this.getTotalAndCount();
    
    },
  methods: {
    goToTheCatalog(){
      this.$emit('changePage')
    },
    getDataFromSessionStorage(){
      this.cartList = JSON.parse(sessionStorage.getItem("cartList"));
    },
    getTotalAndCount(){ 
      if(this.cartList){
        this.totalCart = 0;
        this.countCart = 0;
        this.cartList.forEach(item => {
          this.totalCart += item.currentPrice*item.countInCart;
          this.countCart += item.countInCart;
        }
      )}
    },
    updateDataInSessionStorage(){
      sessionStorage.removeItem("cartList");
      sessionStorage.setItem("cartList", JSON.stringify(this.cartList));
    },
    decrease(id){
      this.cartList.map(item=>{if(item.id===id && item.countInCart>0){
        item.countInCart-=1;  
      }
      this.getTotalAndCount();
      this.updateDataInSessionStorage();
      }) 
      this.awayEventToWrapper();
    },
    increase(id){
      this.cartList.map(item=>{if(item.id===id){
        item.countInCart+=1;  
      }
      this.getTotalAndCount();
      this.updateDataInSessionStorage();
      });
      this.awayEventToWrapper();
    },
    deleteItem(id){
      let newArr = [];
      this.cartList.forEach(item => {
        if(item.id == id){return} else
          {newArr.push(item);
        }
      });
      this.cartList = newArr;
      this.getTotalAndCount();
      this.updateDataInSessionStorage();
      this.awayEventToWrapper();
    },
    awayEventToWrapper(){
      this.$emit('updateStorage');
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

p {
  font-family: 'Montserrat', sans-serif;
}

.app-cart-cart {
  margin-top: 29px;
  text-align: left;
  color: #1C1C27;
  font-size: 20px;
  font-weight: 600;
}
.app-cart-wrapper {
  width: 1110px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 13px;
 
}
.app-cart-list {
  overflow: auto;
}


.app-cart-item {
  width: 507px;
  height: 182px;
  padding: 18px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px #0000001A;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 13px;
}
@media (max-width:767px) {
  .app-catalog-item {
    width: 90%;
  }
}
.app-cart-left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.app-cart-central-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 116px;
}
.app-cart-right-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.app-cart-change-count {
  padding-left: 10.5px;
  padding-right: 10.5px;
}
.app-cart-image {
  width: 146px;
  height: 136px;
}
.app-cart-change-count {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.app-cart-name {
  font-size: 17px;
  font-weight: 500;
  line-height: 21px;
}
.app-cart-count {
  font-size: 17px;
  font-weight: 600;
  line-height: 21px;
}
.app-cart-price {
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  color: #AAAAAA;
}
.app-cart-totalSum {
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-align: right;
}
.app-cart-icon-delete {
  width: 20px;
  height: 17px;
}
.app-cart-block-total {
  width: 350px;
  height: 120px;
  position: relative;
}
.app-cart-total {
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px #0000001A;
  border-radius: 30px;
  height: 92px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 22px;
}
.app-cart-total p{
  margin-top: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
}
.app-cart-black-part {
  background: #101010;
  box-shadow: 0px 0px 20px 0px #00000040;
  border-radius: 20px;
  position:absolute;
  top:60px;
  width: 100%;
  height: 65px;
}
.app-cart-black-part p {
  color:#FFFFFF;
  font-size: 17px;
  font-weight: 600;
  line-height: 21px;
  text-align: center;
  margin-top: 22px;
}


@media (max-width:767px) {
  .app-cart-wrapper {
    flex-direction: column;
    align-content: center;
  }
  .app-cart-list{
  width: 90%;
}
  .app-cart-item {
  width: 100%;
}}
</style>