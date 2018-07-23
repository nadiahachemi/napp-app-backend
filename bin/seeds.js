const mongoose = require("mongoose");
const User = require("../models/user-model.js");
const Product = require("../models/products-models.js");

mongoose.Promise = Promise;
mongoose
    .connect(process.env.MONGODB_URI, { useMongoClient: true })
    .then(() => {
        console.log('Connected to Mongo!')
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });


const routineData = [
    {
        name: "Wash and Go",
        description: "Pour réaliser un Wash’n’Go parfait, il vous faut :Un bon après shampoing si possible sans paraben, silicone et sulfate pour le « Co Wash ».1 peigne à queue : pour vous aider à tracer vos sections. Des pinces à cheveux pour sécuriser vos sections ou des élastiques pour cheveux. 1 DENMAN brosse ou 1 peigne à dents larges pour démêler vos cheveux. 1 vieux tee-shirt en coton pour sécher vos cheveux. Un lait capillaire ou leave in conditioner léger pour hydrater. De l’huile ou un beurre pour sceller l’hydratation. Un gel pour aider à définir et maintenir vos boucles. Un sèche cheveux pour les plus impatientes. Pour cette étape, il faut y aller franchement ! Tes cheveux doivent être gorgés d’eau donc, le plus simple, c’est la douche. Munis-toi de ton conditionner chouchou du moment, puis appliques-en deux bonnes noisettes en massant l’ensemble de ton cuir chevelu. Cette étape est cruciale, car le rôle du conditionner est très important ; il va assouplir et redessiner tes boucles. C’est aussi l’étape parfaite pour démêler tes cheveux en douceur. Pour ce faire, tu peux utiliser tes doigts ou un peigne ; à toi de voir !Cette étape n’est pas indispensable, mais préférable pour un joli résultat. Profite du temps de pose, d’environ 15 minutes, pour faire un gommage par exemple.On élimine tous les résidus de produits.Le résultat est déjà plutôt pas mal, mais si tu veux que ça tienne, il te faudra appliquer un leave-in ou une crème de coiffage ; à toi de choisir. Ce geste permettra à tes boucles d’être bien dessinées et plus souples que jamais !ON SCELLE L’HYDRATATION! Pour ce faire, une goutte de ton huile végétale du moment suffira à apporter de la brillance et de la nutrition à l’ensemble de ta chevelure. On a presque terminé ; il ne reste plus que l’étape du coiffage. Secoue tes cheveux la tête en bas, mais ne les peigne surtout pas, préfère tes doigts. Niveau séchage, c’est comme tu préfères, à l’air libre ou au séchoir. Je pense que le temps à ta disposition fera le choix pour toi ! Si tu as besoin d’effectuer quelques finitions, mise sur un gel à l’aloe vera ou au lin.",
        pictureUrl: "http://2.bp.blogspot.com/-G69CLMOqwB0/VeWptOXMaEI/AAAAAAAA3gs/1fjsx_Locz8/s1600/4b_4c%2Bwash%2Band%2Bgo.jpg",
        video:"https://www.youtube.com/watch?v=Tg0vm7pi0rs"
    }
   ,
    
   ,
  
]


    routineData.forEach((oneRoutine)=>{
      Routine.create(oneRoutine)
       .then((routineDoc) => {
        console.log(`Created ${routineDoc} in the database`);
    })
    .catch((err) => {

        console.log('Create routine Fail 💩', err)
    })
});