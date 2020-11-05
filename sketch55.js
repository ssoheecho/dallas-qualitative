let smithsonian_data;
let img_width = 70;
let margin = 5;
let images = [];
let folder = "downloads2";
let loadedImagesCount = 0;
var Ratings = [];
let sliderMean;
var para;
let h1;
let Curves;
// let redArrow;

/////////////////////////////////////////////////////////////////////////////
function preload() {
  smithsonian_data = loadJSON("data3.json");
}
////////////////////////////////////////////////////////////////////////////

function setup() {



// redArrow = loadImage('AccessoryImages\red arrow.png');
// redArrow = createImage('Project2Qual\AccessoryImages\red arrow.png');
// redArrow.position(1000,1000);


  canvas = createCanvas(900, 900);
  canvas.position(20, 65);
  background(50);
  push(), noStroke(), fill(255, 127, 80);
  rect(0, 0, 900, 10);
  //rect(0,890,900,10);
  pop()
  push()
  // left side 'book'
  stroke(80)
  line(1, 10, 2, 1000), line(3, 10, 3, 1000), line(5, 10, 5, 1000), line(7, 10, 7, 1000), line(9, 9, 9, 1000);
  push()
  stroke(112, 101, 68)
  strokeWeight(3)
  line(14, 9, 14, 995)
  pop(), push(), rect()

  // top side 'book' 
  // line(2,2,900,2), line(3,3,900,3), line(5,5,900,5), line(7,7,900,7), line(9,9,900,9);
  // right side 'book'
  stroke(112, 101, 68);
  strokeWeight(1.1)
  line(888, 9, 888, 900), line(890, 10, 890, 900), line(892, 10, 892, 900), line(894, 10, 894, 900), line(895, 10, 895, 900), line(897, 10, 897, 900), line(899, 10, 899, 900);
  // bottom of book

  stroke(200, 100, 20)
  fill(50)
  curve(0, 1000, 0, 899, 900, 899, 900, 1000), curve(0, 970, 5, 899, 895, 899, 895, 970), curve(0, 950, 10, 899, 890, 899, 895, 950), curve(0, 930, 10, 899, 890, 899, 895, 930);
  push(),
    fill(50),
    strokeWeight(3)
  curve(0, 90, 0, 10, 900, 10, 900, 90), pop(), curve(0, 970, 5, 899, 895, 899, 895, 970), curve(0, 950, 10, 899, 890, 899, 895, 950), curve(0, 930, 10, 899, 890, 899, 895, 930)
  curve(0, 920, 10, 899, 890, 899, 895, 920);
  //  curve(0, 1000, 15, 899, 885, 899, 895, 1000);

  pop();

  /////////////////////////////////////////////P5 DOM ADD HTML AND CONTROL POSITION 
  para = createP("Upon following this trail I found 41 images related to the subject of Shungas, which means Picture of Spring. Shunga usually appear in woodblock print format and have a pretty interesting history. They reached their height of production in the early 1600s and contrary to popular belief were acquired by both men and women, and by people of all socio-economic classes. Samurai’s often carried Shungas with them to battle for their ability to ward off death, buildings kept them in stock in order to ward off fire, and couples got them to enhance fertility. With this knowledge it is very clear that these images served a wide variety of audiences and might take a variety of forms. Many of the images range from scenes of battle to more fantastical portrayals of sexual acts that are not necessarily based in reality. There has been an extensive history of government’s trying to make it illegal despide its widespread production. According to one account from 1859, westerns described the presentation of Shunga as vile and degrading. ").addClass('BigTextBox');
  ////////IMAGE ARROW 
  para.position(950, 180);
  para2 = createP("Data sourced from the Smithsonian Institution Freer and Sackler Gallery National Museums of Asian Art<br/> Images are protected by strict copyright law and their commercial use is <b>not</b> allowed. For more info regarding the data used please visit github.io/Dalbed349/MS1Quant").addClass('dataDetails');
  para2.position(1000, 930);
  // para3 = createP()
  // para3.position()
  para3 = createP("Given the variety of Shunga content produced and the data in the Freer and Sackler database, I wanted to explore how we might perceive artworks that seemingly fall on a spectrum presented to us as “erotic art”. In order to accomplish this task it was necessary to gather data regarding people's perception of the level of erotic content found in each sample Shunga image. It is important to note that this study is NOT concerned with the question of “are you excited?”, but rather “do you think this image has content that could be considered erotic and to what degree?”  An anonymous google form was created where participants (N=11) filled out ").addClass('AnotherBigTextBox')
  para3.position(950,450)

  h2 = createElement('h2', 'The Shungas of Edo Period Japan')
  h2.position(1100, 50);

  h2_2 = createElement('h2', 'The Current Study')
  h2_2.position(1220, 370);

  h4 = createElement('h4', 'Visualizing Modern Perceptions of Erotic Japanese Woodblock Prints from the 17th-19th century')
  h4.position(1000, 120);



  createP('<b>Try for yourself!</b> ').addClass('TryItOut');
  createP('Adjust the sliders to adjust the display of images!').addClass('TryItOutInfo');
  //mean slider
  createP('This slider controls the overall (mean) value of images that will be selected. <br/> Further to the right will include images rated <b>higher</b> on the "Erotic Content Scale"').addClass('sliderLabel');
  sliderMean = createSlider(1, 10, 1, .1);
  sliderMean.position(950, 700);
  sliderMean.style('width', '200px');

  //SD slider
  createP('This slider affects the range of images that can be selected. <br/>Further to the right will select a wider variety of image ratings').addClass('sliderLabel2');
  sliderSD = createSlider(.1, 2.5, 1, .1);
  sliderSD.position(950, 800);
  sliderSD.style('width', '200px');
  ///////////////////////////////////////////////////END DOM MANIPULATIONS 
  // TEST WITH RANDOM DATA
  // smithsonian_data.forEach(d => {
  //   console.log(d)
  //   d["rating"] = (Math.random() * 10).toFixed(2);
  // });

  for (let i = 0; i < smithsonian_data.length; i++) {
    Ratings.push(smithsonian_data[i].Rating)

  }
  console.log(Ratings);

  loadImages();
  getAverage(smithsonian_data);

  noLoop();
  console.log(smithsonian_data[1].rating)


}/// end setup


////////////////////////
total = 0
function getAverage(smithsonian_data) {
  console.log(smithsonian_data)
  smithsonian_data.forEach(element => {
    total += parseFloat(element.rating);
  });
}
// load all images
function loadImages() {
  for (var i = 0; i < 36; i++) {
    images[i] = loadImage(folder + "/" + smithsonian_data[i].filename,
      function () {
        // since these will load asynchronously, we have to keep track how many images have been loaded
        loadedImagesCount++;
        console.log(loadedImagesCount)
        //once all have been loaded, draw the images
        if (loadedImagesCount == smithsonian_data.length) {                    //unnecessary draw but does not hurt 
          draw();
        }
      }
    );
  }
}
let newRatingList = [];
let displayImages = [];
//////////////////////////////////////////////////////////////////////////////

function mouseClicked() {
  clear();
  background(50);
  push()
  noStroke()
  fill(255, 127, 80);
  rect(0, 0, 900, 10);
  pop()
  push()
  stroke(112, 101, 68)
  strokeWeight(3)
  line(14, 9, 14, 1000)
  pop()
  push()
  stroke(112, 101, 68)
  strokeWeight(1)
  line(10, 9, 10, 995)
  line(17, 10, 17, 1000)
  pop()
  push()
  stroke(0)
  strokeWeight(1)
  // left side 'book'
  line(1, 10, 2, 1000), line(3, 10, 3, 1000), line(5, 10, 5, 1000), line(7, 10, 7, 1000), line(9, 9, 9, 1000); pop()


  // top side 'book' 
  // line(2,2,900,2), line(3,3,900,3), line(5,5,900,5), line(7,7,900,7), line(9,9,900,9);
  push()
  // right side 'book'
  stroke(112, 101, 68);
  strokeWeight(1.1)
  line(888, 9, 888, 900), line(890, 10, 890, 900), line(892, 10, 892, 900), line(894, 10, 894, 900), line(895, 10, 895, 900), line(897, 10, 897, 900), line(899, 10, 899, 900);
  // bottom of book
  pop()
  stroke(200, 100, 20)
  fill(50)
  curve(0, 1000, 0, 899, 900, 899, 900, 1000);
  curve(0, 970, 5, 899, 895, 899, 895, 970);
  curve(0, 950, 10, 899, 890, 899, 895, 950);
  curve(0, 930, 10, 899, 890, 899, 895, 930);
  push();
  fill(50)
  strokeWeight(3)
  curve(0, 90, 0, 10, 900, 10, 900, 90),
    //curve(0, 970, 0, 10, 900, 10, 900, 970),
    pop();
  curve(0, 950, 10, 899, 890, 899, 895, 950);
  curve(0, 930, 10, 899, 890, 899, 895, 930);


  //curve(0, 920, 10, 899, 890, 899, 895, 920);
  //  curve(0, 1000, 15, 899, 885, 899, 895, 1000);

  pop();
  //random element 

  // let randomElement = [];
  //   for (let element0through8; element0through8<9; element0through8++){
  //     randomElement[element0through8] = Math.floor(Math.random() * smithsonian_data.length);
  //   }
  let randomElement0 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement1 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement2 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement3 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement4 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement5 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement6 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement7 = Math.floor(Math.random() * smithsonian_data.length);
  let randomElement8 = Math.floor(Math.random() * smithsonian_data.length);

  // displayImages = [smithsonian_data[randomElement[0]].Rating, smithsonian_data[randomElement[1]].Rating, smithsonian_data[randomElement[2]].Rating, smithsonian_data[randomElement[3]].Rating, smithsonian_data[randomElement[4]].Rating, smithsonian_data[randomElement[5]].Rating, smithsonian_data[randomElement[6]].Rating, smithsonian_data[randomElement[7]].Rating, smithsonian_data[randomElement[8]].Rating];


  // console.log(randomElement0, smithsonian_data[randomElement0].Rating);
  // console.log(randomElement1, smithsonian_data[randomElement1].Rating);
  console.log(displayImages);

  displayImages = [smithsonian_data[randomElement0].Rating, smithsonian_data[randomElement1].Rating, smithsonian_data[randomElement2].Rating, smithsonian_data[randomElement3].Rating, smithsonian_data[randomElement4].Rating, smithsonian_data[randomElement5].Rating, smithsonian_data[randomElement6].Rating, smithsonian_data[randomElement7].Rating, smithsonian_data[randomElement8].Rating];
  // console.log(randomElement0, smithsonian_data[randomElement0].Rating);
  // console.log(randomElement1, smithsonian_data[randomElement1].Rating);
  // console.log(displayImages);

  ////////////////////FORCE MEAN SD MATH 
  let val = sliderMean.value();
  let val2 = sliderSD.value();
  const blockBlock = 6;
  let rectSide = width / blockBlock;
  // var list = createListOfNNumbersBetweenAAndB(9, 1, 10);
  var newList = transfomListToExactMeanAndSd(displayImages, val, val2);

  console.log('transformed list, mean and sd', newList, computeMeanSdAndItervalRangeMinMax(newList));
  console.log('original list, mean and sd', Ratings, computeMeanSdAndItervalRangeMinMax(Ratings));

  //////////
  function computeMeanSdAndItervalRangeMinMax(Ratings) {
    const sum = Ratings.reduce((a, b) => (a * 1) + (b * 1), 0);
    const mean = sum / Ratings.length;
    const sumMinusMean = Ratings.reduce((a, b) => a + (b - mean) * (b - mean), 0);
    //console.log(sum);
    return {
      mean: mean,
      sd: Math.sqrt(sumMinusMean / (Ratings.length - 1)),
      range: [Math.min(...Ratings), Math.max(...Ratings)]
    };
  }
  /////
  function transfomListToExactMeanAndSd(Ratings, mean, sd) {
    const current = computeMeanSdAndItervalRangeMinMax(Ratings);
    return Ratings.map(n => (sd * (n - current.mean) / current.sd + mean).toFixed(3));
  }                          // 1 * (9 - RatingsMean) / Ratings SD + mean 

  finalDisplay = [];

  goal = newList[0];


  newList.forEach(finalData => {
    var closest = Ratings.reduce(function (prev, curr) {
      return (Math.abs(curr - finalData) < Math.abs(prev - finalData) ? curr : prev);
    });
    finalDisplay.push(Ratings.indexOf(closest));
    //console.log(Ratings.indexOf(closest));

    /// IF SELECT ONE, CANT SELECT AGAIN ?
  })
  console.log(finalDisplay)
  //////////////////////////////////////////////////////
  //console.log(closest);
  // RATE THE LEVEL OF EROTIC CONTENT 
  console.log(goal);




  /////MIDDLE ROW 
  image(images[finalDisplay[1]], positionArray[7].xPosition - 5, positionArray[2].yPosition, .2 * width, .2 * images[finalDisplay[1]].height * width / images[finalDisplay[1]].width);

  image(images[finalDisplay[4]], positionArray[14].xPosition, positionArray[2].yPosition, .2 * width, .2 * images[finalDisplay[4]].height * width / images[finalDisplay[4]].width);

  image(images[finalDisplay[7]], positionArray[15].xPosition + 5, positionArray[2].yPosition, .2 * width, .2 * images[finalDisplay[7]].height * width / images[finalDisplay[7]].width);

  ///
  let display0 = .2 * images[finalDisplay[0]].height * width / images[finalDisplay[0]].width;
  let display1 = .2 * images[finalDisplay[1]].height * width / images[finalDisplay[1]].width;
 // let display2 = .2 * images[finalDisplay[2]].height * width / images[finalDisplay[2]].width;
  let display3 = .2 * images[finalDisplay[3]].height * width / images[finalDisplay[3]].width;
  let display4 = .2 * images[finalDisplay[4]].height * width / images[finalDisplay[4]].width;
 // let display5 = .2 * images[finalDisplay[5]].height * width / images[finalDisplay[5]].width;
  let display6 = .2 * images[finalDisplay[6]].height * width / images[finalDisplay[6]].width;
  let display7 = .2 * images[finalDisplay[7]].height * width / images[finalDisplay[7]].width;
 // let display8 = .2 * images[finalDisplay[8]].height * width / images[finalDisplay[8]].width;

  ///COlUMN 1 

  console.log(display0);
  if (display0 > 200 && display0 < 275) {
    image(images[finalDisplay[0]], positionArray[7].xPosition - 5, positionArray[1].yPosition - 65, .2 * width, .2 * images[finalDisplay[0]].height * width / images[finalDisplay[0]].width);
  } else if (display0 > 275) {
    image(images[finalDisplay[0]], positionArray[7].xPosition - 5, positionArray[1].yPosition - 100, .2 * width, .2 * images[finalDisplay[0]].height * width / images[finalDisplay[0]].width);

  } else {
    image(images[finalDisplay[0]], positionArray[7].xPosition - 5, positionArray[1].yPosition + 50, .2 * width, .2 * images[finalDisplay[0]].height * width / images[finalDisplay[0]].width);
  }////////3rd x3


  if (display1 > 200 && display1 < 275) {
    image(images[finalDisplay[2]], positionArray[7].xPosition - 5, positionArray[3].yPosition + 65, .2 * width, .2 * images[finalDisplay[2]].height * width / images[finalDisplay[2]].width);
  } else if (display1 > 275) {
    image(images[finalDisplay[2]], positionArray[7].xPosition - 5, positionArray[3].yPosition + 95, .2 * width, .2 * images[finalDisplay[2]].height * width / images[finalDisplay[2]].width);

  } else if (display1 > 50 && display1 < 100) {
    image(images[finalDisplay[2]], positionArray[7].xPosition - 5, positionArray[3].yPosition - 115, .2 * width, .2 * images[finalDisplay[2]].height * width / images[finalDisplay[2]].width);

  } else {
    image(images[finalDisplay[2]], positionArray[7].xPosition - 5, positionArray[3].yPosition - 50, .2 * width, .2 * images[finalDisplay[2]].height * width / images[finalDisplay[2]].width);
  }

  //if (display1< )


  ////////4///x1y2  COLUMN 2 



  if (display3 > 200 && display3 < 275) {
    image(images[finalDisplay[3]], positionArray[14].xPosition, positionArray[1].yPosition - 65, .2 * width, .2 * images[finalDisplay[3]].height * width / images[finalDisplay[3]].width);
  } else if (display3 > 275) {
    image(images[finalDisplay[3]], positionArray[14].xPosition, positionArray[1].yPosition - 100, .2 * width, .2 * images[finalDisplay[3]].height * width / images[finalDisplay[3]].width);

  } else {
    image(images[finalDisplay[3]], positionArray[14].xPosition, positionArray[1].yPosition + 50, .2 * width, .2 * images[finalDisplay[3]].height * width / images[finalDisplay[3]].width);
  }

  //////
  if (display4 > 200 && display4 < 275) {
    image(images[finalDisplay[5]], positionArray[14].xPosition, positionArray[3].yPosition + 65, .2 * width, .2 * images[finalDisplay[5]].height * width / images[finalDisplay[5]].width);
  } else if (display4 > 275) {
    image(images[finalDisplay[5]], positionArray[14].xPosition, positionArray[3].yPosition + 95, .2 * width, .2 * images[finalDisplay[5]].height * width / images[finalDisplay[5]].width);
  } else if (display4 > 50 && display4 < 100) {
    image(images[finalDisplay[5]], positionArray[14].xPosition, positionArray[3].yPosition - 115, .2 * width, .2 * images[finalDisplay[5]].height * width / images[finalDisplay[5]].width);
  }
  else {
    image(images[finalDisplay[5]], positionArray[14].xPosition, positionArray[3].yPosition - 50, .2 * width, .2 * images[finalDisplay[5]].height * width / images[finalDisplay[5]].width);
  }

  /////////////COLUMN 3 (display6/7/8)
  if (display6 > 200 && display6 < 275) {
    image(images[finalDisplay[6]], positionArray[15].xPosition + 5, positionArray[1].yPosition - 65, .2 * width, .2 * images[finalDisplay[6]].height * width / images[finalDisplay[6]].width);
  } else if (display6 > 275) {
    image(images[finalDisplay[6]], positionArray[15].xPosition + 5, positionArray[1].yPosition - 100, .2 * width, .2 * images[finalDisplay[6]].height * width / images[finalDisplay[6]].width);

  } else {
    image(images[finalDisplay[6]], positionArray[15].xPosition + 5, positionArray[1].yPosition + 50, .2 * width, .2 * images[finalDisplay[6]].height * width / images[finalDisplay[6]].width);
  }
  console.log(display6)
  //////
  if (display7 > 200 && display7 < 275) {
    image(images[finalDisplay[8]], positionArray[15].xPosition + 5, positionArray[3].yPosition + 65, .2 * width, .2 * images[finalDisplay[8]].height * width / images[finalDisplay[8]].width);
  } else if (display7 > 275) {
    image(images[finalDisplay[8]], positionArray[15].xPosition + 5, positionArray[3].yPosition + 95, .2 * width, .2 * images[finalDisplay[8]].height * width / images[finalDisplay[8]].width);
  } else if (display7 > 50 && display7 < 100) {
    image(images[finalDisplay[8]], positionArray[15].xPosition + 5, positionArray[3].yPosition - 115, .2 * width, .2 * images[finalDisplay[8]].height * width / images[finalDisplay[8]].width);
  }
  else {
    image(images[finalDisplay[8]], positionArray[15].xPosition + 5, positionArray[3].yPosition - 50, .2 * width, .2 * images[finalDisplay[8]].height * width / images[finalDisplay[8]].width);
  }
  console.log(display7)
  //////////////////

  console.log(positionArray)
  console.log(.2 * width, .2 * images[finalDisplay[0]].height * width / images[finalDisplay[0]].width)



  /////
  /// DRAW IMAGE WITIHN BOUNDS OF GRID
  //   for (let x = 0; x < blockBlock; x += 1) {
  //     for (let y = 0; y < blockBlock; y += 1) {
  //       let xPos = x * rectSide;
  //       let yPos = y * rectSide;
  //       //redraw()
  //       for (i = 0; i < positionArray.length; i++) {
  //         if (mouseX > positionArray[i].xPosition && mouseY > positionArray[i].yPosition && mouseX < positionArray[i].xPosition + rectSide && mouseY < positionArray[i].yPosition + rectSide) {
  //           // console.log("positionArray x is: " + positionArray[2].xPosition)
  //           // console.log("mouse x is:" + mouseX)
  //           // console.log("mouse y is:" + mouseY)
  //           image(random(images), positionArray[i].xPosition, positionArray[i].yPosition, rectSide - 5, rectSide - 5)
  //         } // end of if mouse statement   /// x                    y                               xsize         y size                
  //       } // end for statement
  //     }
  //   }
}
///////////////////////////////

let positionArray = [];
console.log(positionArray)
function draw() {

  const blockBlock = 5;
  //background(50, 50, 50);
  let rectSide = width / blockBlock;
  for (let x = 0; x < blockBlock; x += 1) {
    for (let y = 0; y < blockBlock; y += 1) {
      let xPos = x * rectSide;
      let yPos = y * rectSide;
      let imagePosition = {
        xPosition: xPos,
        yPosition: yPos
      }
      positionArray.push(imagePosition);
    }
  }
}