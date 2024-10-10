const BOTH_COUNT_AND_UNCOUNT = "chicken,paper,time,hair,room,memory,coffee,water,beer,tea,soda,chocolate,light,gear,art,science"

const NOUN_SAME_VERBS = "access,dump,mail,shelter,ache,dust,make,shock,act,dye,man,shop,address,echo,march,show,aim,email,mark,sign,alert,end,match,\
signal,answer,escape,mate,silence,arrest,escort,matter,sin,attack,esteem,mean,sip,attribute,estimate,measure,skate,auction,exchange,milk,sketch,back,\
excuse,mind,ski,bail,exhibit,mine,slice,balance,experience,miss,slide,balloon,eye,mistake,slip,ban,face,moor,smell,bandage,fall,move,smile,bank,favor,\
mug,smirk,bare,fax,nail,smoke,bargain,fear,name,snack,battle,feel,need,snow,beam,fight,nest,sound,bear,file,notch,span,beat,fill,note,spot,bend,film,\
notice,spray,benefit,finish,number,sprout,blame,fish,object,squash,blast,fix,offer,stain,bleach,flap,oil,stamp,block,flash,order,stand,bloom,float,pack,\
star,blow,flood,pad,start,board,floss,paddle,state,bomb,flow,paint,steer,bother,flower,park,step,bounce,fly,part,sting,bow,fold,pass,stop,box,fool,paste,\
store,bread,force,pat,storm,break,form,pause,stress,breed,frame,pay,strip,broadcast,freeze,pedal,stroke,brush,frown,peel,struggle,bump,function,pelt,study,\
burn,garden,permit,stuff,buy,gaze,phone,stunt,cake,gel,photograph,subject,call,glue,pick,suit,camp,grate,pine,supply,care,grease,place,support,catch,grill,\
plan,surf,cause,grimace,plane,surprise,challenge,grin,plant,suspect,change,grip,play,swap,chant,guarantee,plow,swing,charge,guard,plug,swivel,cheat,guess,\
point,tack,check,guide,poke,talk,cheer,hammer,pop,taste,chip,hand,post,tear,claim,handle,practice,tease,clip,harm,praise,telephone,cloud,harness,present,\
test,clue,hate,proceed,thought,coach,head,process,thunder,color,heap,produce,tick,comb,heat,progress,tie,combat,help,project,time,comfort,hide,promise,tip,\
conduct,highlight,protest,tire,conflict,hike,pull,toast,contest,hit,pump,touch,contract,hold,punch,tour,contrast,hop,push,tow,control,hope,question,trace,cook,hose,quilt,track,coop,hug,quiz,trade,\
copy,humor,race,train,cost,hunt,rain,transport,count,hurry,raise,trap,cover,ice,rant,travel,crack,impact,rate,treat,crash,inch,reach,trick,crate,increase,reason,trim,credit,influence,rebel,trust,\
crush,insult,record,tug,cure,interest,refill,turn,curl,iron,refund,twist,curve,itch,reign,type,cut,jail,reject,upstage,cycle,jam,rent,use,dam,joke,repair,vacuum,damage,judge,repeat,value,dance,jump,\
reply,visit,deal,keep,report,voice,decay,kick,request,vote,decrease,kiss,rhyme,wake,delay,knit,ring,walk,delight,knock,riot,waltz,demand,knot,risk,watch,design,label,rock,water,dial,land,roll,wave,die,\
last,row,wear,dislike,laugh,ruin,whip,display,lead,rule,whisper,dive,leap,run,whistle,divorce,level,sail,wick,dock,license,sand,wink,double,lie,saw,wire,doubt,lift,scare,wish,drain,light,scratch,work,\
draw,limit,screw,worry,dream,link,search,wrap,dress,load,season,wreck,drill,loan,sense,drink,lock,shampoo,yawn,drive,look,shape,yield,duck,love,share,zone";

const UNCOUNT_NOUNS = "advice,information,knowledge,imagination,creativity,education,intelligence,love,luck,music,air,cement,clothing,energy,glue,gold,coral,\
iron,money,oil,paper,salt,sand,steel,wood,water,gasoline,steam,sugar,vinegar,beauty,confidence,happiness,justice,peace,respect,safety,strength,time,\
furniture,equipment,machinery,tools,weapons,lightning,rain,snow,wind,medicine,accommodation,advertising,beer,bread,childhood,chocolate,coffee,courage,\
fame,food,freedom,fun,hair,health,homework,juice,luggage,milk,news,poetry,progress,research,rice,rubbish,tea,transport,travel,whisky,work,aggression,\
assistance,attention,athletics,access,adulthood,alcohol,applause,agriculture,atmosphere,anger,art,absence,aid,arithmetic,age,beef,bravery,business,\
blood,botany,bacon,baggage,ballet,butter,biology,behaviour,cake,cash,chaos,compassion,calm,corruption,comprehension,cheese,currency,carbon,cardboard,\
chalk,chess,coal,commerce,confusion,cookery,countryside,crockery,cutlery,content,cotton,data,dancing,democracy,damage,darkness,determination,\
delight,depression,driving,dignity,dessert,design,dust,distribution,dirt,duty,economics,earth,expense,electricity,enthusiasm,danger,enjoyment,\
envy,evil,engineering,entertainment,evolution,existence,ethics,evidence,employment,experience,failure,fire,fiction,fashion,forgiveness,faith,flour,\
flu,fear,finance,fruit,fuel,friendship,flesh,genetics,garbage,growth,grief,grammar,garlic,gossip,gymnastics,glass,grass,golf,gratitude,ground,guilt,\
harm,hardware,hydrogen,help,hate,hope,hospitality,heat,hatred,hunger,honey,humour,honesty,height,housework,history,ice,independence,infrastructure,\
ice cream,importance,industry,irony,injustice,innocence,insurance,inflation,judo,jealousy,jam,jewellery,joy,kindness,karate,laughter,labour,lava,\
livestock,land,leather,linguistics,light,loneliness,lack,litter,leisure,logic,literature,mail,mankind,marriage,magic,marble,mercy,meat,management,\
mathematics,moonlight,methane,metal,mayonnaise,mud,mist,motivation,motherhood,measles,nature,nitrogen,nutrition,noise,nonsense,nurture,obedience,\
obesity,oxygen,passion,parking,pressure,perfume,physics,psychology,peel,pepper,patience,permission,philosophy,plastic,production,pollution,pleasure,\
pork,petrol,pronunciation,pride,policy,purity,poverty,punctuation,power,produce,protection,publicity,pasta,pay,pain,painting,quartz,quality,quantity,\
reliability,rum,recreation,reality,revenge,racism,relief,relaxation,religion,salad,scaffolding,soil,satisfaction,satire,security,sorrow,seafood,speed,\
scenery,sewing,space,software,seaside,stream,stupidity,shopping,stress,shame,spite,silence,sunshine,sleep,status,success,soup,smoking,silver,symmetry,\
spaghetti,spelling,soap,sport,stuff,smoke,tolerance,thirst,technology,trousers,tennis,trade,timber,turbulence,toothpaste,traffic,toast,thunder,transportation,\
trust,trouble,temperature,understanding,usage,underwear,unemployment,unity,violence,veal,environment,\
validity,vitality,vision,vegetation,vegetarianism,vengeance,warmth,weight,whiskey,weather,wildlife,welfare,wine,wisdom,wealth,wheat,wool,width,yoga,\
youth,yeast,zoology,zinc";

const NGUYEN_AM = 'ueoai'

function Helper_N_V_Add_S_ES(words) {

	words = words.trim();
	var word = words;
	var rest = "";
	// word is combine of 2,3...
	if (words.indexOf(" ") >= 0)
	{
		word = words.split(" ")[0]
		rest = words.substring(word.length)
	}

	if (word==='potato') return 'potatoes' + rest
	if (word==='tomato') return 'tomatoes' + rest
	if (word==='do') return 'does' + rest
	if (word==='go') return 'goes' + rest

	var r = /^\w+.*(s|ss|sh|ch|x)+$/gi.test(word)
	if (r) return word+'es' + rest

	r = /^\w+.*(uy|ey|oy|ay|iy)+$/gi.test(word)
	if (r) return word+'s' + rest

	r = /^\w+.*[^ueoai]+y$/gi.test(word)
	if (r) return word.substring(0, word.length-1) + 'ies' + rest

	return word +'s' + rest
}

function xxx () {
	var word = "go to word"

	if (word.indexOf(" ") >= 0)
	var firstW = word.split(" ")[0]
	var rest = word.substring(firstW.length)
	console.log(firstW)
	console.log(rest)
}

function test(noun) {
	console.log(Helper_N_V_Add_S_ES(noun))
} 

// test("go to school")
// test("play")
// test("baby")

function Helper_Is(noun) {}