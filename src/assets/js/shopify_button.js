import ShopifyBuy from '@shopify/buy-button-js';

const client = ShopifyBuy.buildClient({
  domain: 'holokit.myshopify.com',
  storefrontAccessToken: 'b8789c7e198f19d1fc4b72e3a114e231'
});

const ui = ShopifyBuy.UI.init(client);
ui.createComponent('product', {
  id: [314238631964],
  node: document.getElementById('shopify-product-component'),
  moneyFormat: '%24%7B%7Bamount%7D%7D',
  options: {
    "product": {
      "layout": "horizontal",
      "variantId": "all",
      "width": "100%",
      "contents": {
        "img": false,
        "imgWithCarousel": true,
        "variantTitle": false,
        "description": true,
        "buttonWithQuantity": false,
        "quantity": false
      },
      "styles": {
        "product": {
          "font-family": "Dosis, sans-serif",
          "text-align": "left",
          "@media (max-width: 601px)": {
            "max-width": "100%",
            "margin-left": "10px",
            "margin-bottom": "50px"
          }
        },
        "button": {
          "background-color": "#3cbac4",
          "font-family": "Dosis, sans-serif",
          "padding-left": "20px",
          "padding-right": "20px",
          ":hover": {
            "background-color": "#36a7b0"
          },
          ":focus": {
            "background-color": "#36a7b0"
          },
          "font-weight": "normal"
        },
        "variantTitle": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "title": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal",
          "font-size": "26px"
        },
        "description": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "price": {
          "font-family": "Dosis, sans-serif",
          "font-size": "18px",
          "font-weight": "normal"
        },
        "compareAt": {
          "font-size": "15px",
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        }
      },
      "googleFonts": [
        "Dosis",
        "Dosis",
        "Dosis",
        "Dosis",
        "Dosis",
        "Dosis"
      ]
    },
    "cart": {
      "contents": {
        "button": true
      },
      "styles": {
        "button": {
          "background-color": "#3cbac4",
          "font-family": "Dosis, sans-serif",
          ":hover": {
            "background-color": "#36a7b0"
          },
          ":focus": {
            "background-color": "#36a7b0"
          },
          "font-weight": "normal"
        },
        "title": {
          "font-family": "Dosis, sans-serif"
        },
        "lineItem": {
          "font-family": "Dosis, sans-serif"
        },
        "notice": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "footer": {
          "font-family": "Dosis, sans-serif",
          "background-color": "#ffffff"
        }
      },
      "googleFonts": [
        "Dosis"
      ]
    },
    "modalProduct": {
      "contents": {
        "img": false,
        "imgWithCarousel": true,
        "variantTitle": false,
        "buttonWithQuantity": true,
        "button": false,
        "quantity": false
      },
      "styles": {
        "product": {
          "@media (max-width: 601px)": {
            "max-width": "100%",
            "margin-left": "10px",
            "margin-bottom": "0px"
          }
        },
        "button": {
          "background-color": "#3cbac4",
          "font-family": "Dosis, sans-serif",
          "padding-left": "20px",
          "padding-right": "20px",
          ":hover": {
            "background-color": "#36a7b0"
          },
          ":focus": {
            "background-color": "#36a7b0"
          },
          "font-weight": "normal"
        },
        "variantTitle": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "title": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "description": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "price": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        },
        "compareAt": {
          "font-family": "Dosis, sans-serif",
          "font-weight": "normal"
        }
      },
      "googleFonts": [
        "Dosis",
        "Dosis",
        "Dosis",
        "Dosis",
        "Dosis",
        "Dosis"
      ]
    },
    "toggle": {
      "styles": {
        "toggle": {
          "font-family": "Dosis, sans-serif",
          "background-color": "#3cbac4",
          ":hover": {
            "background-color": "#36a7b0"
          },
          ":focus": {
            "background-color": "#36a7b0"
          },
          "font-weight": "normal"
        }
      },
      "googleFonts": [
        "Dosis"
      ]
    },
    "option": {
      "styles": {
        "label": {
          "font-family": "Dosis, sans-serif"
        },
        "select": {
          "font-family": "Dosis, sans-serif"
        }
      },
      "googleFonts": [
        "Dosis",
        "Dosis"
      ]
    },
    "productSet": {
      "styles": {
        "products": {
          "@media (min-width: 601px)": {
            "margin-left": "-20px"
          }
        }
      }
    }
  }
});
