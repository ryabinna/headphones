<template>
  <div class="app-wrapper">
    <header class="app-wrapper-header">
      <div>
        <h1 class="app-wrapper-header-h1">QPICK</h1>
      </div>
      <div class="app-wrapper-icons">
        <div class="app-wrapper-icon">
          <img class="app-wrapper-header-img" src="../images/like.svg" alt="like">
          <div class="app-wrapper-circle-number">
            <div class="app-wrapper-circle">
            </div>
            <p class="app-wrapper-number">1</p>
          </div>
        </div>
        <div class="app-wrapper-icon">
          <img 
          @click="goToTheCart"
          class="app-wrapper-header-img" 
          src="../images/cart.svg" 
          alt="cart">
          <div 
            v-if="countCartOnIcon" 
            class="app-wrapper-circle-number"
            >
            <div class="app-wrapper-circle">
            </div>
            <p class="app-wrapper-number">{{countCartOnIcon}}</p>  
          </div>
        </div>
      </div>
    </header>
    <app-catalog 
      v-if="isCatalogOpen"
      @updateStorage="updateData"/>
    <app-cart 
      v-else
      @changePage="goToTheCatalog"
      @updateStorage="updateData"/>
    <footer class="app-wrapper-footer">
      <div class="app-wrapper-footer-wrap">
        <div class="app-wrapper-footer-left-side">
          <h1 class="app-wrapper-footer-h1">QPICK</h1>
        </div>
        <div class="app-wrapper-footer-central-side">
          <div class="app-wrapper-footer-nav">
            <ul  class="app-wrapper-footer-nav-list">
              <li class="app-wrapper-footer-nav-item">
                <a> Избранное</a>
              </li>
              <li class="app-wrapper-footer-nav-item">
                <a @click="goToTheCart()"> Корзина</a>
              </li>
              <li class="app-wrapper-footer-nav-item">
                <a> Контакты</a>
              </li>
            </ul>
          </div>
          <div class="app-wrapper-footer-service">
            <p class="app-wrapper-footer-service-p">Условия сервиса</p>
            <div class="app-wrapper-footer-service-lang">
              <img class="app-wrapper-footer-service-planet" src='../images/Lang.svg' alt="lang">
              <p class="app-wrapper-footer-service-p">Каз</p>
              <p class="app-wrapper-footer-service-p active">Рус</p>
              <p class="app-wrapper-footer-service-p">Eng</p>
            </div>
          </div>
        </div>
        <div class="app-wrapper-right-side">
          <div class="app-wrapper-footer-social-networks">
            <img class="app-wrapper-footer-social-networks-icon" src='../images/VK.svg' alt="vk">
            <img class="app-wrapper-footer-social-networks-icon" src='../images/Telegram.svg' alt="telegramm">
            <img class="app-wrapper-footer-social-networks-icon" src='../images/Whatsapp.svg' alt="whatsapp">
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

import AppCatalog from './AppCatalog';
import AppCart from './AppCart';

export default {
  name: 'AppWrapper',
  components: {
    AppCatalog,
    AppCart,
  },
  data(){
    return {
      isCatalogOpen: true,
      countCartOnIcon: 0,
      productsInCart: [],
    }
  },
  mounted(){
    this.updateData();
  },
  methods: {
    goToTheCart(){
      this.isCatalogOpen = false;
    },
    goToTheCatalog(){
      this.isCatalogOpen = true;
    },
    updateData(){
      this.productsInCart=JSON.parse(sessionStorage.getItem("cartList"));
      this.getCountCartOnIcon();
    },
    getCountCartOnIcon(){
      if (!this.productsInCart) {
        this.countCartOnIcon = 0;
         return this.countCartOnIcon;
        } else 
      {this.countCartOnIcon = 0;

      this.productsInCart.forEach(item => {
        this.countCartOnIcon +=item.countInCart;
      });
      return this.countCartOnIcon;}
    }
  }  
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

*{
  font-family: 'Montserrat', sans-serif;
}
.app-wrapper {
  min-width: 1440px;
  margin: 0 auto;
  background: #EAEAEA;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.app-wrapper-header {
  width: 1135px;
  height: 60px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 6px;
}
.app-wrapper-header-h1 {
  font-size: 25px;
  font-weight: 700; 
  color: #101010;
}
.app-wrapper-icons {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.app-wrapper-icon {
  position:relative;
  margin-left: 45px;
}
.app-wrapper-circle {
  margin: 0px 3.6px 0px 3.6px;
  position:absolute;
  top:-7px;
  left:9px;
  height: 17.4px;
  width: 17.4px;
  background: #FFA542;
  border-radius: 50%;
}
.app-wrapper-number {
  margin:0px;
  padding:0px;
  position:absolute;
  top:-8px;
  left:17px;
  color: #FFFFFF;
  font-size: 15px;
}

.app-wrapper-footer{
  padding: 30px;
  width: 1050px;
  height: 89px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px  20px 0 0;
}
.app-wrapper-footer-wrap{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.app-wrapper-footer-central-side {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 38%;
  min-width: 300px;
}
.app-wrapper-footer-h1 {
  font-size: 25px;
  font-weight: 700; 
  color: #101010;
  margin: 0;
}
.app-wrapper-footer-nav-list{
  list-style-type: none; 
  margin: 0;
}
.app-wrapper-footer-nav-item {
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
}
.app-wrapper-footer-nav-item a {
  font-size: 17px;
  font-weight: 400; 
  color: #101010;
  text-align: left;
  line-height: 21px;
}
.app-wrapper-footer-service-p {
  font-size: 17px;
  font-weight: 400; 
  color: #101010;
  margin: 0;
}
.app-wrapper-footer-service {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}
.app-wrapper-footer-service-lang {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.app-wrapper-footer-social-networks-icon {
  margin-left: 17.9px;
}
.app-wrapper-footer-social-networks-icon:first-child {
  margin-left: 0px;
}
.active {
  color:rgba(255, 165, 66, 1)
}

</style>
