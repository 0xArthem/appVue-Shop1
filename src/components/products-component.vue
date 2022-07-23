<template>

    <div v-if="cart.length > 0">
        <div v-on:click="showShop = !showShop"
            style="float:right;margin-right:8%;margin-top:-47px;font-size:20px;cursor:pointer;">
            <a>
                <em class="fas fa-shopping-cart"></em>
                <span class="badge ms-1" style="background-color:#42b983;font-size:10px;">{{ itemTotalAmount }}</span>
            </a>
        </div>
    </div>

    <h1>Nos produits</h1>

    <div class="filtres">
        <div class="div_search">
            <input v-model="searchkey" type="search" id="search" placeholder="Rechercher un produit ..." autocomplete="off">
            <span v-if="searchkey && filteredList.length > 0" style="margin-left:15px;color:black;font-size:17px;">
                {{ filteredList.length }} résultat<span v-if="filteredList.length > 1">s</span>
            </span>
        </div>

        <div class="filters">
            <a class="tri__key" v-bind:class="{ active: currentFilter === 'ALL' }" v-on:click="setFilter('ALL')">Tout</a>
            <a class="tri__key" v-bind:class="{ active: currentFilter === 'Ipsam' }" v-on:click="setFilter('Ipsam')">Ipsam</a>
            <a class="tri__key" v-bind:class="{ active: currentFilter === 'Ipsum' }" v-on:click="setFilter('Ipsum')">Ipsum</a>
            <a class="tri__key" v-bind:class="{ active: currentFilter === 'Ipsem' }" v-on:click="setFilter('Ipsem')">Ipsem</a>
            <a class="tri__key" v-bind:class="{ active: currentFilter === 'Ipsim' }" v-on:click="setFilter('Ipsim')">Ipsim</a>
        </div>
    </div>

    <!-- affichage du panier-->
    <div style="margin-top:-210px;position:absolute;z-index:1;background-color:white;margin-left:69%;" v-if="showShop">
        <div v-if="cart.length > 0" class="shopping-cart" id="shopping-cart">
            <h2 id="titre_panier">Panier</h2>

            <div class="item-group">
                <div v-for="product, id in cart" class="item" :key="product.id">
                
                    <h5 class="card-title__cart">{{ product.name }}</h5>
                    <div clas="img-container">
                        <img id="img__container_img" v-bind:src="product.url" alt="">
                    </div>
                   

                    <div class="item-description">
                        <p id="product_price_panier">{{ product.price}}€</p>
                    </div>

                    <div class="item-quantity">
                        <h6>Quantité : {{ product.quantity }}</h6>
                    </div>

                    <div class="cart-icons">
                        <button class="btn btn-outline-dark" v-on:click="cartPlusOne(product)"><em class="fas fa-plus"></em></button>

                        <button class="btn btn-outline-dark" v-on:click="cartMinusOne(product, id)"
                        style="margin-left:20px;margin-right:20px;"><em class="fas fa-minus"></em></button>

                        <button class="btn btn-outline-dark" v-on:click="cartRemoveItem(id)">
                            <em class="far fa-trash-alt"></em>
                        </button>

                    </div>
                </div>
                <br>
                <div class="grand-total">
                    <div class="total">
                        <h2>Total</h2>
                        <h2>{{ cartTotalAmount }}€</h2>
                    </div>
                    <h6>Total articles : {{ itemTotalAmount }}</h6>
                </div>
            </div>
        </div>

    </div>
    

    <br>
    <div class="row" style="position:relative;">
        <div class="col" v-for="product in filteredList" :key="product.id">
            <div class="card h-100" v-if="currentFilter === product.category || currentFilter === 'ALL'">
                <img v-bind:src="product.url" class="card-img-top" alt="product.name"/>
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">
                        {{ product.description }}
                    </p>
                    <!---price-->
                    <a class="a__btn_price">
                        <button v-on:click="addToCart(product)" class="btn btn-light btn-rounded btn_price">{{ product.price }}€</button>
                    </a>
                    <!--------->
                </div>
            </div>
        </div>
        <h1 v-if="filteredList.length == 0" style="color:white;background-color:#42b983;padding:20px;margin-top:70px;margin-left:15px;">
            AUCUN RESULTAT
        </h1>

    </div>
    
</template>


<script>
export default {
    name: 'products-component',
    data () {
        return {
            searchkey: '',
            currentFilter: 'ALL',
            cart: [],
            showShop: false,
            products: [
                {id: 1, name: 'Lorem Ipsum', category: 'Ipsum', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 140, url:'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnJhY2VsZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'},
                {id: 2, name: 'Lorem Ipsam', category: 'Ipsam', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 230, url:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
                {id: 3, name: 'Lorem Ipsom', category: 'Ipsom', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 840, url:'https://images.unsplash.com/photo-1602527428055-a2526fabdc9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
                {id: 4, name: 'Lorem Ipsim', category: 'Ipsim', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 2120, url:'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnJhY2VsZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'},
                {id: 5, name: 'Lorem Ipsem', category: 'Ipsem', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 530, url:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
                {id: 6, name: 'Lorem Ipsam', category: 'Ipsam', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 40, url:'https://images.unsplash.com/photo-1602527428055-a2526fabdc9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
                {id: 7, name: 'Lorem Ipsim', category: 'Ipsim', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 2120, url:'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnJhY2VsZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'},
                {id: 8, name: 'Lorem Ipsem', category: 'Ipsem', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 530, url:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
                {id: 9, name: 'Lorem Ipsam', category: 'Ipsam', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo excepturi dicta, numquam ab odio mollitia maxime incidunt, veritatis.', price: 40, url:'https://images.unsplash.com/photo-1602527428055-a2526fabdc9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
            ]
        }
    },
    computed: {
        filteredList() {
            return this.products.filter((product) => {
                return product.name.toLowerCase().includes(this.searchkey.toLowerCase());
            })
        },
        cartTotalAmount() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity * this.cart[item].price);
            }
            return total;
        },
        itemTotalAmount() {
            let itemTotal = 0;
            for (let item in this.cart) {
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }
    },
    methods: {
        setFilter: function(filter) {
			this.currentFilter = filter;
		},
        addToCart(product) {
            for (let i=0; i< this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    return this.cart[i].quantity++;
                }
            }
            this.cart.push({
                id: product.id,
                name: product.name,
                url: product.url,
                description: product.description,
                price: product.price,
                quantity: 1
            })
        },
        cartPlusOne(product) {
            product.quantity = product.quantity + 1;
        },
        cartMinusOne(product, id) {
            if (product.quantity == 1) {
                this.cartRemoveItem(id);
            }
            product.quantity = product.quantity - 1;
        },
        cartRemoveItem(id) {
            this.cart.splice(id, 1);
        }
    }
}
</script>


<style scoped>
    h1{
        padding-top:30px;
        color: #42b983;
        text-align:center;
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 5px;
    }
    .col{
        margin-top:90px;
        /* position:absolute !important; */
    }
    .row{
        margin-left:5%;
        padding-bottom:100px;
        float:left;
    }
    .card{
        width: 370px !important;
        height:442px !important;
        border-radius: 1px;
        box-shadow:none;
        border-bottom: solid 3px #42b983;
        /* position:relative !important; */
    }
    .card-img-top{
        transition-duration: 0.5s;
        border-radius:1px;
    }
    .card-img-top:hover{
        transform: scale(1.4);
        transition-duration: 0.5s;
        cursor:pointer;
        z-index:1;
        border-radius:5px;
    }
    .card-title{
        color:#42b983;
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 3px;
        font-size:23px;
    }
    .a__btn_price{
        padding-top:20px;
        display:flex;
        justify-content:center;
    }
    .btn_price{
        font-size:13px;
        border:solid 2px #42b983;
        background-color:white;
        color:black;
        /* box-shadow:none; */
    }
    .btn_price:hover{
        background-color:#42b983;
        border:solid 2px #42b983;
        color:white;
    }

    .card-icons{
        display:flex;
        justify-content:space-between;
    }
    #icon_shopping{
        background-color:transparent !important;
        border:none;
        font-size:28px;
        color:#42b983;
        cursor:pointer;
    }
    #search{
        border:none;
        border-bottom:solid 3px #42b983;
        /* margin-left:5.8%; */
        padding:7px;
        width:497px;
        outline: none;
        margin-left:6%;
    }
    .filtres{
        /* display:flex;
        justify-content:center; */
        margin-top:20px;
    }
    .filters{
        margin-top:30px;
        margin-left:4.9%;
    }
    ::placeholder{
        letter-spacing:0.4px;
    }
    .tri__key {
	padding: 15px;
	cursor:pointer;
	border-radius: 1px;
	/* transition: all 0.35s; */
    box-shadow:none;
    background: #FAFAFA;
    color:#42b983;
    margin-left:15px;
    margin-right:15px;
    letter-spacing:1px;
    }

    .tri__key:hover {
        border-bottom:solid 3px #FAFAFA;
        background-color:#42b983;
        color: #FAFAFA;
    }

    /****** */
    .shopping-cart{
        width:450px;
        text-align:center !important;
        margin-top:50px;
        border:solid 3px #42b983;
    }
    /**item-group img-container item-description */
    #img__container_img{
        width:200px;
        /* padding:10px; */
        /* border-radius:100%; */
    }
    .card-title__cart{
        color:#42b983;
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 2px;
        font-size:20px;
        margin-top:30px;
        margin-left:7px;
    }
    #titre_panier{
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 3px;
        color:black;
        padding-top:15px;
        margin-left:15px;
    }
    #product_price_panier{
        color:black;
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 2px;
    }
    .item-description{
        display: inline-block;
        padding:10px;
    }
</style>