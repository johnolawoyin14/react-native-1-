import {create} from 'zustand';
import {produce} from 'immer';

import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist((set, get) => ({
    CoffeeList:CoffeeData,
    BeansList:BeansData,
    CartPrice:0,
    FavoritesList:[],
    CartList:[],
    OrderHistoryList:[],
    addToCart:(cartItem)=>set(produce(state=>{
      let found=false

      for (leti=0;state.CartList.length;i++ ){
        if(state.CartList[i].id==cartItem.id){
          found=true
          let size=false
          for(j=0;j<state.CartList[i].prices.length;j++){
            if(state.CartList[i].prices[j].size==cartItem.prices[0].size){
              size=true;
              state.CartList[i].prices[j].quantity++
              break
            }
          }
          if(size==false){
                          state.CartList[i].prices.push(cartItem.prices[0]);

          }
          state.CartList[i].prices.sort((a,b)=>{
            if(a.size>b.size){
              return -1
            }
            if(a.size<b.size){
              return 1
            }
            return 0
          })
          break
        }
        if(found==false){
          state.CartList.push(cartItem)
        }
      }
    })),
    calculateCartPrice:()=>set(produce(state=>{
      let totalPrice=0
    for (let i = 0; i < state.CartList.length; i++) {

      let tempPrice=0;
      for (let j = 0; j < state.CartList[i].prices.length; j++) {

        tempPrice =
          tempPrice +
          parseFloat(state.CartList[i].prices[j].price) *
            state.CartList[i].prices[j].quantity;

        
      }
      state.CartList[i].itemPrice=tempPrice.toFixed(2).toString()
      totalPrice=totalPrice+tempPrice

    }
    state.CartPrice=totalPrice.toFixed(2).toString()
    })),

    addToFavouriteList:(type,id)=>set(produce(state=>{
      if(type=="Coffee"){
        for (let i = 0; i < state.CoffeeList.length; i++) {

          if(state.CoffeeList[i].id==id){
            if(state.CoffeeList[i].favourite==false){
              state.CoffeeList[i].favourite=true;
              state.FavoritesList.unshift(state.CoffeeList[i])
            }
            break
          }

        }
      }
     else if(type=="Beans"){
        for (let i = 0; i < state.BeansList.length; i++) {

          if(state.BeansList[i].id==id){
            if(state.BeansList[i].favourite==false){
              state.BeansList[i].favourite=true;
              state.FavoritesList.unshift(state.BeansList[i])
            }
            break
          }

        }
      }
    })),
    deleteFromFavouriteList:(type,id)=>set(produce(state=>{
       if (type == 'Coffee') {
         for (let i = 0; i < state.CoffeeList.length; i++) {
           if (state.CoffeeList[i].id == id) {
             if (state.CoffeeList[i].favourite == true) {
               state.CoffeeList[i].favourite = false;
             }
             break;
           }
         }
       }
       if (type == 'Beans') {
         for (let i = 0; i < state.BeansList.length; i++) {
           if (state.BeansList[i].id == id) {
             if (state.BeansList[i].favourite == true) {
               state.BeansList[i].favourite = false;
             }
             break;
           }
         }
       }

       let spliceIndex=-1
       for (let i = 0; i < state.FavoritesList.length; i++) {

        if(state.FavoritesList[i].id==id){
          spliceIndex=i;
          break
        }
        

       }
       state.FavoritesList.splice(spliceIndex,1)
    }))
  }), {
    name: 'coffee-app',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);


