<template>
  <div class="app-catalog">
    <p class="app-catalog-p">Наушники</p>
    <div class="app-catalog-headphones">
      <div class="app-catalog-item"
        v-for="item in headphones"
        :key="item.id"
      >
        <img class="app-catalog-item-image" :src=item.image :alt=item.name>
        <div class="app-catalog-item-info">
          <div class="app-catalog-item-info-left-side">
            <p class="app-catalog-item-info-left-side-item-name"> {{ item.name }}</p>
            <div class="app-catalog-item-info-star-aria">
              <img class="star" src="../images/star.svg" alt="star"> 
              <p class="rate">{{ item.rate }}</p>
            </div>
          </div>
          <div class="app-catalog-item-info-right-side">
            <div>  
              <p class="price">{{ item.currentPrice }}&#8381;</p>
              <p v-if="item.fullPrice" class="price line-through">{{ item.fullPrice }}&#8381;</p>
            </div>
              <p v-if="!item.countInCart" class="app-catalog-item-buy point"
                @click="putProductInTheCart(item.id)"
              >купить</p>
              <p v-else class="app-catalog-item-buy"
              >товар в корзине</p>
          </div>
        </div>
      </div>
    </div>
    <p class="app-catalog-p">Беспроводные наушники</p>
    <div class="app-catalog-headphones">
      <div class="app-catalog-item"
        v-for="item in wirelessHeadphones"
        :key="item.id"
      >
        <img class="app-catalog-item-image" :src=item.image :alt=item.name>
        <div class="app-catalog-item-info">
          <div class="app-catalog-item-info-left-side">
            <p class="app-catalog-item-info-left-side-item-name"> {{ item.name }}</p>
            <div class="app-catalog-item-info-star-aria">
              <img class="star" src="../images/star.svg" alt="star"> 
              <p class="rate">{{ item.rate }}</p>
            </div>
          </div>
          <div class="app-catalog-item-info-right-side">
            <div>  
              <p class="price">{{ item.currentPrice }}&#8381;</p>
              <p v-if="item.fullPrice" class="price line-through">{{ item.fullPrice }}&#8381;</p>
            </div>
              <p v-if="!item.countInCart" class="app-catalog-item-buy point"
              @click="putProductInTheCart(item.id)"
              >купить</p>
              <p v-else class="app-catalog-item-buy"
              >товар в корзине</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'AppCatalog',
  data(){
    return{
        headphones: [
          {
            id: 1,
            name: 'Apple BYZ S852I',
            image:require("@/images/AppleBYZS8521.png"),
            rate: '4.7',
            currentPrice: 2927,
            fullPrice: 3527,
            countInCart:0
          },
          {
            id: 2,
            name: 'Apple EarPods',
            image: require('@/images/AppleEarPods1.png'),
            rate: '4.5',
            currentPrice: 2927,
            fullPrice: '',
            countInCart:0
          },
          {
            id: 3,
            name: 'Apple EarPods',
            image: require('@/images/AppleEarPods2.png'),
            rate: '4.5',
            currentPrice: 2927,
            fullPrice: '',
            countInCart:0
          }, 
          {
            id: 4,
            name: 'Apple BYZ S852I',
            image: require('@/images/AppleBYZS8521.png'),
            rate: '4.7',
            currentPrice: 2927,
            fullPrice: '',
            countInCart:0
          },
          {
            id: 5,
            name: 'Apple EarPods',
            image: require('@/images/AppleEarPods1.png'),
            rate: '4.5',
            currentPrice: 2927,
            fullPrice: '',
            countInCart:0
          },
          {
            id: 6,
            name: 'Apple EarPods',
            image: require('@/images/AppleEarPods2.png'),
            rate: '4.5',
            currentPrice: 2927,
            fullPrice: '',
            countInCart:0
          }  
        ],
        wirelessHeadphones: [
          {
            id: 7,
            name: 'Apple EarPods',
            image: require('@/images/AppleAirPods3.png'),
            rate: '4.7',
            currentPrice: 9527,
            fullPrice: '',
            countInCart:0
          },
          {
            id: 8,
            name: 'GERLAX GH-04',
            image: require('@/images/GERLAXGH-04.png'),
            rate: '4.7',
            currentPrice: 6527,
            fullPrice: '',
            countInCart:0
          },
          {
            id: 9,
            name: 'BOROFONE BO4',
            image: require('@/images/BOROFONEBO4.png'),
            rate: '4.7',
            currentPrice: 7527,
            fullPrice: '',
            countInCart:0
          },
    
        ],
        listSelectedProduct:[],
    }
  },
  mounted(){
    let data = JSON.parse(sessionStorage.getItem("cartList"));
    if (data){
      this.listSelectedProduct = data; 
      this.headphones.forEach(item => {
        for (let i = 0;  i < this.listSelectedProduct.length; i++){
          if (this.listSelectedProduct[i].id === item.id){
            item.countInCart = this.listSelectedProduct[i].countInCart;
          }
        }
      });
      this.wirelessHeadphones.forEach(item => {
        for (let i = 0;  i < this.listSelectedProduct.length; i++){
          if (this.listSelectedProduct[i].id === item.id){
            item.countInCart = this.listSelectedProduct[i].countInCart;
          }
        }
      })  
    }  
  },
  methods: {
    putProductInTheCart(id){
      this.headphones.map(item=>{if(item.id===id){
        item.countInCart+=1;
        if (!this.listSelectedProduct[id]){
          this.listSelectedProduct.push(item);
          }
        } 
      });
        this.wirelessHeadphones.map(item=>{if(item.id===id){
          item.countInCart+=1;
          if (!this.listSelectedProduct[id]){
          this.listSelectedProduct.push(item);
          }
        }
      });  
      this.putDataInLocalStorage();
      this.awayEventToWrapper();
    },
    putDataInLocalStorage(){
      sessionStorage.setItem("cartList", JSON.stringify(this.listSelectedProduct));
    },
    awayEventToWrapper(){
      this.$emit('updateStorage');
    }
  }, 
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

p {
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #000000;
  padding: 0;
  margin: 0;
}

.app-catalog-p {
  color:#838383;
  font-size: 20px;
  margin-bottom: 20px;
}
.app-catalog-item {
  height: 367px;
  width: 310px;
  padding: 15px 20px 25px 20px;
  margin-bottom: 30px;
  border-radius: 30px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

@media (max-width:992px) {
  .app-catalog-item {
    width: 45%;
  }
}
@media (max-width:767px) {
  .app-catalog-item {
    width: 95%;
  }
}
.app-catalog-headphones {
  width: 1110px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap:wrap;
}
.app-catalog-item-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 310px;
  height: 74px;
}
.app-catalog-item-info-star-aria {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.star{
  margin-right: 10px;
}
.price {
  color: #FFA542;   
}
.line-through {
  text-decoration: line-through;
  font-size:13px;
}
.app-catalog-item-info-left-side-item-name {
  padding: 0;
  margin: 0;
}
.app-catalog-item-info-left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.app-catalog-item-info-right-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.point {
  cursor: pointer;
}

</style>
