const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    Brooms :   Symbol("brooms"),
    Dustbins:   Symbol("dustbins"),
    SnowShovels:   Symbol("snowShovels"),
    GarbageContainer :  Symbol("garbageContainer"), 
    RecyclingContainer : Symbol("recyclingContainer"),  
    UpSell : Symbol("upsell")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(sNumber, sUrl)
    {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sBrooms = "";
        this.sDustbins = "";
        this.sSnowShovels = "";
        this.sRecyclingContainer = "";
        this.sUpSell  = "";
        this.sGarbageContainer = "";
        this.sTotal=0;
        this.isDeice=false;       
        this.sUrl=sUrl;
        this.sNumber=sNumber;
    }
    handleInput(sInput)
    {
        let aReturn = [];       
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.RecyclingContainer;
                aReturn.push("Welcome to @Curbside. Here you can purchase on your way home from work and pick things up that you need answering questions. Please insert odd numbers only(0-∞).");
                aReturn.push('If you need any assistance push <a href="help.html"> help </a>');
                aReturn.push("Our shop kindly proposes you to purchase: recycling containers ($7), brooms ($9), garbage containers ($8), dustbins($5), snowshowels($3) with deicing liquids or car cloths for just $1(you choose)! ")
                aReturn.push("How many recycling containers would you like to order($7)?");
                break;
                case OrderState.RecyclingContainer:
                
                if(sInput>=0 && Number.isInteger(parseInt(sInput)))
                {
                    if(sInput>0)
                    {
                        this.sRecyclingContainer = sInput+" recycling container(s).";
                        this.sTotal+=7*sInput;
                    }
                    else 
                    {
                        this.sRecyclingContainer=" no recycling containers.";
                    }
                }
                else 
                {
                    aReturn.push("please input odd numbers only from zero to many")
                    this.stateCur=OrderState.RecyclingContainer;
                    aReturn.push("How many recycling containers would you like to order($7)?");
                    break;
                }
                aReturn.push("How many garbage containers would you like to order($8)?");
                this.stateCur = OrderState.GarbageContainer
                break;
                case OrderState.GarbageContainer:
                
                if(sInput>=0 && Number.isInteger(parseInt(sInput)))
                {
                    if(sInput>0)
                    {
                        this.sGarbageContainer = sInput+" garbage container(s),";
                        this.sTotal+=8*sInput;
                    }
                    else 
                    {
                        this.sGarbageContainer=" no garrbage containers,";
                    }
                }
                else 
                {
                    aReturn.push("please input odd numbers only from zero to many")
                    this.stateCur=OrderState.GarbageContainer;
                    aReturn.push("How many garbagecontainers would you like to order($8)?");
                    break;
                }
                aReturn.push("How many brooms would you like to order($9)?");
                this.stateCur = OrderState.Brooms
                break;
            case OrderState.Brooms:
                
                if(sInput>=0 && Number.isInteger(parseInt(sInput)))
                {
                    if(sInput>0)
                    {
                        this.sBrooms = sInput+" broom(s),";
                        this.sTotal+=9*sInput;                        
                    }
                    else 
                    {
                        this.sBrooms=" no brooms,";
                    }
                }
                else 
                {
                    aReturn.push("please input odd numbers only from zero to many")
                    this.stateCur=OrderState.Brooms;
                    aReturn.push("How many brooms would you like to order($8)?");
                    break;
                }
                aReturn.push("How many dustbins would you like to order($5)?");
                this.stateCur = OrderState.Dustbins
                break;
            case OrderState.Dustbins:               
                if(sInput>=0 && Number.isInteger(parseInt(sInput)))
                {
                    if(sInput>0)
                    {
                    this.sDustbins = sInput+ " dustbin(s),";
                    this.sTotal+=5*sInput;                    
                    }
                    else 
                    {
                        this.sDustbins=" no dustbins,";
                    }
                }
                else 
                {
                    aReturn.push("please input odd numbers only from zero to many")
                    this.stateCur=OrderState.Dustbins;
                    aReturn.push("How many dustbins would you like to order($5)?");
                    break;
                }               
                this.stateCur=OrderState.SnowShovels;
                aReturn.push("How many snowshowels would you like to order($3)?");
                break;
            case OrderState.SnowShovels:
                this.stateCur = OrderState.UpSell
                if(sInput>=0 && Number.isInteger(parseInt(sInput)))
                {
                    if(sInput>0)
                    {
                    this.sSnowShovels = sInput+" snowshowel(s),";
                    this.sTotal+=3*sInput;
                    }
                    else 
                    {
                        this.sSnowShovels=" no snowshowels, ";
                    }                    
                }
                else 
                {
                    aReturn.push("please input odd numbers only from zero to many")
                    this.stateCur=OrderState.SnowShovels;
                    aReturn.push("How many snowshowels would you like to order($3)?");
                    break;
                }    
                if (this.sSnowShovels=="no snowshowels")
                {
                    aReturn.push("How many car cloths would you like to order $1 (only today) ?"); 
             
                }        
                else 
                {
                    aReturn.push("How many deicing liquids would you like to order for $1(price of the day)?");
                    this.isDeice=true;
                }   
                this.stateCur = OrderState.UpSell               
                break;
            case OrderState.UpSell:                               
                if(sInput>=0 && Number.isInteger(parseInt(sInput)))
                {   
                if(this.isDeice)
                {
                    this.sUpSell = sInput+ " deice liquid(s),";
                    this.sTotal+=1*sInput;                                      
                }
                else                 
                {
                    this.sUpSell=sInput+" car cloth(s),";
                    this.sTotal+=1*sInput;
                }    
                console.log(this.sTotal);                           
                if (this.sTotal==0)
                {
                    aReturn.push("please input other than '0' positive odd numbers");
                }
                else
                {                  
                aReturn.push("Thank-you for your order of:");
                aReturn.push(`${this.sBrooms} ${this.sDustbins} ${this.sGarbageContainer} ${this.sSnowShovels} ${this.sUpSell} ${this.sRecyclingContainer}`); // thank you for your order of soup '', 'hamburger/cheesburger', '' cake, 'with/no' topping. 
                // adding taxes:
                this.sTotal=(this.sTotal*1.13).toFixed(2);
                
                aReturn.push(`that costs (13% taxes are included)$ ${this.sTotal}`); 
                aReturn.push("We will text you when we are ready to meet you at curbside");                       
                break;
                }
            }
            else
            {
                aReturn.push("please input odd numbers only from zero to many");
                //this.stateCur = OrderState.Upsell
                if(this.isTopping)
                {
                    aReturn.push("How many deicing liquids would you like to order for $1(price of the day)?");
                }
                else
                {
                    aReturn.push("How many car cloths would you like to order $1 (only today) ?"); 
                }
                this.stateCur = OrderState.UpSell
                break;
            }             
        }
        return aReturn;
    }
  
}