import React from "react";
import { SvgXml } from "react-native-svg";

const HomeOutline = () => {
  const svgMarkup = `
      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9.91118C1 9.39813 1.26113 8.91681 1.70079 8.61948L12.5341 1.29329C13.1124 0.902235 13.8876 0.902236 14.4659 1.29329L25.2992 8.61949C25.7389 8.91681 26 9.39813 26 9.91118V23.6225C26 24.9356 24.8807 26 23.5 26H3.5C2.11929 26 1 24.9356 1 23.6225V9.91118Z" stroke="#8C8C8C" stroke-width="2"/>
      </svg>
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const CommunityOutline = () => {
  const svgMarkup = `
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.29167 3C8.29167 1.89543 9.1871 1 10.2917 1H16.7083C17.8129 1 18.7083 1.89543 18.7083 3V7.29167C18.7083 7.84395 19.156 8.29167 19.7083 8.29167H24C25.1046 8.29167 26 9.1871 26 10.2917V16.7083C26 17.8129 25.1046 18.7083 24 18.7083H19.7083C19.156 18.7083 18.7083 19.156 18.7083 19.7083V24C18.7083 25.1046 17.8129 26 16.7083 26H10.2917C9.1871 26 8.29167 25.1046 8.29167 24V19.7083C8.29167 19.156 7.84395 18.7083 7.29167 18.7083H3C1.89543 18.7083 1 17.8129 1 16.7083V10.2917C1 9.1871 1.89543 8.29167 3 8.29167H7.29167C7.84395 8.29167 8.29167 7.84395 8.29167 7.29167V3Z" stroke="#8C8C8C" stroke-width="2"/>
  </svg>
  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const MenuOutline = () => {
  const svgMarkup = `<svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0435 4.26087V4.26087C14.0435 2.45994 15.5034 1 17.3044 1V1C19.1053 1 20.5652 2.45994 20.5652 4.26087V4.26087" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.28941 16V12.1108C6.28941 11.6567 6.22898 11.2046 6.10971 10.7664C5.83715 9.76496 6.59109 8.77838 7.62893 8.77838H27.1235C28.2557 8.77838 29.0782 9.85466 28.7808 10.9471C28.6942 11.2653 28.6503 11.5937 28.6503 11.9235V16C28.6503 20.9706 24.6209 25 19.6503 25H15.2894C10.3188 25 6.28941 20.9706 6.28941 16Z" stroke="#8C8C8C" stroke-width="2"/>
  <path d="M6.31646 8.41949C7.29973 7.46384 10.947 4.41052 17.4698 4.41052C23.9925 4.41052 27.6398 7.46383 28.6231 8.41949C28.6261 8.42243 28.6315 8.42845 28.6372 8.44303C28.6434 8.45885 28.6502 8.48607 28.6502 8.52507C28.6502 8.69336 28.5145 8.8282 28.348 8.8282H28.3386H28.3292H28.3198H28.3104H28.3009H28.2913H28.2818H28.2721H28.2625H28.2528H28.2431H28.2333H28.2235H28.2137H28.2038H28.1938H28.1839H28.1739H28.1638H28.1538H28.1436H28.1335H28.1233H28.1131H28.1028H28.0925H28.0821H28.0717H28.0613H28.0508H28.0403H28.0298H28.0192H28.0085H27.9979H27.9871H27.9764H27.9656H27.9548H27.9439H27.933H27.922H27.911H27.9H27.8889H27.8778H27.8667H27.8555H27.8442H27.833H27.8217H27.8103H27.7989H27.7875H27.776H27.7645H27.7529H27.7413H27.7297H27.718H27.7063H27.6945H27.6827H27.6708H27.6589H27.647H27.635H27.623H27.611H27.5989H27.5867H27.5746H27.5623H27.5501H27.5378H27.5254H27.513H27.5006H27.4881H27.4756H27.4631H27.4505H27.4378H27.4251H27.4124H27.3996H27.3868H27.374H27.3611H27.3481H27.3352H27.3221H27.3091H27.296H27.2828H27.2696H27.2564H27.2431H27.2298H27.2164H27.203H27.1895H27.1761H27.1625H27.1489H27.1353H27.1216H27.1079H27.0942H27.0804H27.0665H27.0526H27.0387H27.0247H27.0107H26.9967H26.9826H26.9684H26.9542H26.94H26.9257H26.9114H26.897H26.8826H26.8681H26.8536H26.8391H26.8245H26.8098H26.7952H26.7804H26.7657H26.7509H26.736H26.7211H26.7061H26.6912H26.6761H26.661H26.6459H26.6307H26.6155H26.6002H26.5849H26.5696H26.5542H26.5387H26.5233H26.5077H26.4921H26.4765H26.4608H26.4451H26.4294H26.4135H26.3977H26.3818H26.3658H26.3499H26.3338H26.3177H26.3016H26.2854H26.2692H26.2529H26.2366H26.2203H26.2038H26.1874H26.1709H26.1543H26.1377H26.1211H26.1044H26.0877H26.0709H26.0541H26.0372H26.0203H26.0033H25.9863H25.9692H25.9521H25.935H25.9178H25.9005H25.8832H25.8659H25.8485H25.831H25.8135H25.796H25.7784H25.7608H25.7431H25.7254H25.7076H25.6898H25.6719H25.654H25.636H25.618H25.5999H25.5818H25.5637H25.5455H25.5272H25.5089H25.4906H25.4722H25.4537H25.4352H25.4167H25.3981H25.3794H25.3607H25.342H25.3232H25.3044H25.2855H25.2665H25.2475H25.2285H25.2094H25.1903H25.1711H25.1519H25.1326H25.1133H25.0939H25.0745H25.055H25.0354H25.0159H24.9962H24.9766H24.9568H24.9371H24.9172H24.8973H24.8774H24.8574H24.8374H24.8173H24.7972H24.777H24.7568H24.7365H24.7162H24.6958H24.6754H24.6549H24.6344H24.6138H24.5932H24.5725H24.5517H24.531H24.5101H24.4892H24.4683H24.4473H24.4263H24.4052H24.384H24.3628H24.3416H24.3203H24.299H24.2776H24.2561H24.2346H24.2131H24.1914H24.1698H24.1481H24.1263H24.1045H24.0826H24.0607H24.0388H24.0167H23.9947H23.9726H23.9504H23.9282H23.9059H23.8835H23.8612H23.8387H23.8162H23.7937H23.7711H23.7484H23.7257H23.703H23.6802H23.6573H23.6344H23.6115H23.5884H23.5654H23.5422H23.5191H23.4958H23.4726H23.4492H23.4258H23.4024H23.3789H23.3554H23.3317H23.3081H23.2844H23.2606H23.2368H23.2129H23.189H23.165H23.141H23.1169H23.0928H23.0686H23.0443H23.02H22.9957H22.9713H22.9468H22.9223H22.8977H22.8731H22.8484H22.8237H22.7989H22.774H22.7491H22.7242H22.6992H22.6741H22.649H22.6238H22.5986H22.5733H22.548H22.5226H22.4971H22.4716H22.446H22.4204H22.3948H22.369H22.3432H22.3174H22.2915H22.2656H22.2396H22.2135H22.1874H22.1612H22.135H22.1087H22.0824H22.056H22.0295H22.003H21.9765H21.9498H21.9232H21.8964H21.8696H21.8428H21.8159H21.7889H21.7619H21.7349H21.7077H21.6805H21.6533H21.626H21.5986H21.5712H21.5438H21.5162H21.4887H21.461H21.4333H21.4056H21.3778H21.3499H21.322H21.294H21.266H21.2379H21.2097H21.1815H21.1532H21.1249H21.0965H21.0681H21.0396H21.011H20.9824H20.9537H20.925H20.8962H20.8673H20.8384H20.8095H20.7804H20.7514H20.7222H20.693H20.6638H20.6344H20.6051H20.5756H20.5461H20.5166H20.487H20.4573H20.4276H20.3978H20.368H20.3381H20.3081H20.2781H20.248H20.2179H20.1877H20.1574H20.1271H20.0967H20.0663H20.0358H20.0052H19.9746H19.9439H19.9132H19.8824H19.8515H19.8206H19.7897H19.7586H19.7275H19.6964H19.6652H19.6339H19.6026H19.5712H19.5397H19.5082H19.4766H19.445H19.4133H19.3815H19.3497H19.3178H19.2859H19.2539H19.2218H19.1897H19.1575H19.1253H19.093H19.0606H19.0282H18.9957H18.9632H18.9306H18.8979H18.8652H18.8324H18.7995H18.7666H18.7336H18.7006H18.6675H18.6343H18.6011H18.5678H18.5345H18.501H18.4676H18.434H18.4004H18.3668H18.3331H18.2993H18.2654H18.2315H18.1976H18.1635H18.1294H18.0953H18.0611H18.0268H17.9925H17.958H17.9236H17.889H17.8545H17.8198H17.7851H17.7503H17.7154H17.6805H17.6456H17.6105H17.5754H17.5403H17.5051H17.4698H17.4345H17.3993H17.3641H17.329H17.294H17.259H17.2241H17.1892H17.1545H17.1197H17.0851H17.0505H17.0159H16.9815H16.9471H16.9127H16.8785H16.8442H16.8101H16.776H16.742H16.708H16.6741H16.6402H16.6065H16.5727H16.5391H16.5055H16.472H16.4385H16.4051H16.3717H16.3384H16.3052H16.2721H16.239H16.2059H16.1729H16.14H16.1072H16.0744H16.0416H16.009H15.9764H15.9438H15.9113H15.8789H15.8465H15.8142H15.782H15.7498H15.7177H15.6856H15.6536H15.6217H15.5898H15.558H15.5262H15.4945H15.4629H15.4313H15.3998H15.3684H15.337H15.3056H15.2744H15.2431H15.212H15.1809H15.1499H15.1189H15.088H15.0571H15.0263H14.9956H14.9649H14.9343H14.9038H14.8733H14.8428H14.8124H14.7821H14.7519H14.7217H14.6915H14.6614H14.6314H14.6015H14.5716H14.5417H14.5119H14.4822H14.4525H14.4229H14.3934H14.3639H14.3345H14.3051H14.2758H14.2465H14.2173H14.1882H14.1591H14.1301H14.1011H14.0722H14.0433H14.0146H13.9858H13.9571H13.9285H13.9H13.8715H13.843H13.8146H13.7863H13.758H13.7298H13.7017H13.6736H13.6455H13.6176H13.5896H13.5618H13.534H13.5062H13.4785H13.4509H13.4233H13.3958H13.3683H13.3409H13.3135H13.2862H13.259H13.2318H13.2047H13.1776H13.1506H13.1236H13.0967H13.0699H13.0431H13.0164H12.9897H12.9631H12.9365H12.91H12.8836H12.8572H12.8308H12.8045H12.7783H12.7521H12.726H12.7H12.674H12.648H12.6221H12.5963H12.5705H12.5448H12.5191H12.4935H12.4679H12.4424H12.417H12.3916H12.3662H12.341H12.3157H12.2906H12.2654H12.2404H12.2154H12.1904H12.1655H12.1407H12.1159H12.0911H12.0664H12.0418H12.0172H11.9927H11.9683H11.9439H11.9195H11.8952H11.8709H11.8468H11.8226H11.7985H11.7745H11.7505H11.7266H11.7027H11.6789H11.6551H11.6314H11.6078H11.5842H11.5606H11.5371H11.5137H11.4903H11.467H11.4437H11.4205H11.3973H11.3742H11.3511H11.3281H11.3051H11.2822H11.2593H11.2365H11.2138H11.1911H11.1684H11.1458H11.1233H11.1008H11.0784H11.056H11.0337H11.0114H10.9892H10.967H10.9449H10.9228H10.9008H10.8788H10.8569H10.835H10.8132H10.7914H10.7697H10.7481H10.7265H10.7049H10.6834H10.662H10.6406H10.6192H10.5979H10.5767H10.5555H10.5344H10.5133H10.4922H10.4712H10.4503H10.4294H10.4086H10.3878H10.3671H10.3464H10.3257H10.3052H10.2846H10.2641H10.2437H10.2233H10.203H10.1827H10.1625H10.1423H10.1222H10.1021H10.0821H10.0621H10.0422H10.0223H10.0025H9.9827H9.96297H9.94329H9.92367H9.90409H9.88456H9.86508H9.84565H9.82627H9.80694H9.78765H9.76842H9.74924H9.73011H9.71102H9.69199H9.673H9.65406H9.63517H9.61633H9.59754H9.5788H9.56011H9.54147H9.52287H9.50432H9.48583H9.46738H9.44898H9.43062H9.41232H9.39406H9.37586H9.3577H9.33958H9.32152H9.30351H9.28554H9.26762H9.24975H9.23193H9.21415H9.19643H9.17875H9.16112H9.14353H9.12599H9.10851H9.09106H9.07367H9.05632H9.03903H9.02177H9.00457H8.98741H8.9703H8.95324H8.93622H8.91925H8.90233H8.88546H8.86863H8.85185H8.83511H8.81843H8.80179H8.78519H8.76864H8.75214H8.73569H8.71928H8.70292H8.6866H8.67033H8.65411H8.63793H8.6218H8.60572H8.58968H8.57369H8.55774H8.54184H8.52598H8.51017H8.49441H8.47869H8.46302H8.44739H8.43181H8.41628H8.40079H8.38534H8.36994H8.35459H8.33928H8.32402H8.3088H8.29363H8.2785H8.26341H8.24838H8.23338H8.21843H8.20353H8.18867H8.17386H8.15909H8.14436H8.12968H8.11505H8.10046H8.08591H8.07141H8.05695H8.04253H8.02817H8.01384H7.99956H7.98532H7.97113H7.95698H7.94287H7.92881H7.91479H7.90082H7.88689H7.873H7.85916H7.84536H7.8316H7.81789H7.80422H7.7906H7.77701H7.76348H7.74998H7.73653H7.72312H7.70975H7.69643H7.68315H7.66991H7.65672H7.64356H7.63046H7.61739H7.60437H7.59139H7.57845H7.56555H7.5527H7.53989H7.52712H7.51439H7.50171H7.48907H7.47647H7.46391H7.4514H7.43893H7.42649H7.41411H7.40176H7.38945H7.37719H7.36497H7.35279H7.34065H7.32855H7.3165H7.30448H7.29251H7.28058H7.26869H7.25684H7.24504H7.23327H7.22155H7.20986H7.19822H7.18662H7.17506H7.16354H7.15206H7.14063H7.12923H7.11787H7.10656H7.09528H7.08405H7.07285H7.0617H7.05059H7.03952H7.02848H7.01749H7.00654H6.99563H6.98476H6.97393H6.96314H6.95238H6.94167H6.931H6.92037H6.90978H6.89923H6.88871H6.87824H6.86781H6.85741H6.84706H6.83675H6.82647H6.81623H6.80604H6.79588H6.78576H6.77568H6.76564H6.75564H6.74568H6.73576H6.72587H6.71603H6.70622H6.69645H6.68673H6.67704H6.66738H6.65777H6.6482H6.63866H6.62916H6.6197H6.61028H6.6009H6.59155C6.42502 8.8282 6.28931 8.69336 6.28931 8.52507C6.28931 8.48607 6.29617 8.45885 6.30237 8.44303C6.30808 8.42845 6.31343 8.42243 6.31646 8.41949Z" stroke="#8C8C8C" stroke-width="2" stroke-linejoin="round"/>
  <path d="M5.28889 10.5289H1.68761C1.30785 10.5289 1 10.8367 1 11.2165V11.2165C1 11.5962 1.30785 11.9041 1.68761 11.9041H5.632" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M29.6491 10.5289H33.2504C33.6302 10.5289 33.938 10.8367 33.938 11.2165V11.2165C33.938 11.5962 33.6302 11.9041 33.2504 11.9041H29.306" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const DiaryOutline = () => {
  const svgMarkup = `
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.1999 12.1001L24.1998 4.12506C24.1999 2.39915 22.6845 1 20.8153 1H5.58451C3.71528 1 2.19997 2.3991 2.19996 4.12498L2.19983 22.8749C2.19982 24.6008 3.71513 25.9999 5.58436 25.9999L20.8149 26C22.6841 26 24.1994 24.6009 24.1994 22.8751L24.1998 17.6001M1 7.1001H3M1 11.1001H3M1 15.1001H3M1 19.1001H3M25.0002 17.1001H19.5002C18.3956 17.1001 17.5002 16.2047 17.5002 15.1001V14.4126C17.5002 13.308 18.3956 12.4126 19.5002 12.4126H25.0002C25.5525 12.4126 26.0002 12.8603 26.0002 13.4126V16.1001C26.0002 16.6524 25.5525 17.1001 25.0002 17.1001Z" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.84737 9.46229C9.21844 8.83336 9.16542 7.83124 9.72448 7.13946V7.13946C10.3471 6.36901 11.4866 6.27349 12.2288 6.92953L12.5251 7.19144C12.7921 7.42741 13.1931 7.42741 13.46 7.19145L13.7564 6.92949C14.4987 6.27347 15.6381 6.36902 16.2607 7.13948V7.13948C16.8198 7.83125 16.7668 8.83334 16.1378 9.46226L13.6997 11.9004C13.3092 12.2909 12.676 12.2909 12.2855 11.9004L9.84737 9.46229Z" stroke="#8C8C8C" stroke-width="2" stroke-linejoin="round"/>
  </svg>
  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const ProfileOutline = () => {
  const svgMarkup = `
  <svg width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.0818 8.75H10V7.5H10.0818V8.75Z" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 8.75H14.9273V7.5H15V8.75Z" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.7207 9.15605C19.7207 11.1962 20.4757 13.2284 21.8039 14.7752C23.1958 16.3963 24 18.3759 24 20.5016C24 25.7492 18.9983 30.25 12.5 30.25C6.00173 30.25 1 25.7492 1 20.5016C1 18.3759 1.80416 16.3963 3.19607 14.7752C4.52427 13.2284 5.27928 11.1962 5.27928 9.15605C5.27928 4.24247 8.58823 1 12.5 1C16.4118 1 19.7207 4.24247 19.7207 9.15605Z" stroke="#8C8C8C" stroke-width="2"/>
  <circle cx="12.5" cy="20" r="5" stroke="#8C8C8C" stroke-width="2"/>
  </svg>
  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const Home = () => {
  const svgMarkup = `
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 9.91118C1 9.39813 1.26113 8.91681 1.70079 8.61948L12.5341 1.29329C13.1124 0.902235 13.8876 0.902236 14.4659 1.29329L25.2992 8.61949C25.7389 8.91681 26 9.39813 26 9.91118V23.6225C26 24.9356 24.8807 26 23.5 26H3.5C2.11929 26 1 24.9356 1 23.6225V9.91118Z" fill="#8CC840" stroke="#518B1A" stroke-width="2"/>
  <path d="M9 17C9 16.4477 9.44772 16 10 16H17C17.5523 16 18 16.4477 18 17V26H9V17Z" fill="#FED800" stroke="#518B1A" stroke-width="2"/>
  </svg>
  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const Community = () => {
  const svgMarkup = `
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.29167 3C8.29167 1.89543 9.1871 1 10.2917 1H16.7083C17.8129 1 18.7083 1.89543 18.7083 3V7.29167C18.7083 7.84395 19.156 8.29167 19.7083 8.29167H24C25.1046 8.29167 26 9.1871 26 10.2917V16.7083C26 17.8129 25.1046 18.7083 24 18.7083H19.7083C19.156 18.7083 18.7083 19.156 18.7083 19.7083V24C18.7083 25.1046 17.8129 26 16.7083 26H10.2917C9.1871 26 8.29167 25.1046 8.29167 24V19.7083C8.29167 19.156 7.84395 18.7083 7.29167 18.7083H3C1.89543 18.7083 1 17.8129 1 16.7083V10.2917C1 9.1871 1.89543 8.29167 3 8.29167H7.29167C7.84395 8.29167 8.29167 7.84395 8.29167 7.29167V3Z" fill="#FED800" stroke="#518B1A" stroke-width="2"/>
  </svg>  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const Menu = () => {
  const svgMarkup = `
  <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0435 4.26087V4.26087C14.0435 2.45994 15.5034 1 17.3044 1V1C19.1053 1 20.5652 2.45994 20.5652 4.26087V4.26087" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.28941 16V12.1108C6.28941 11.6567 6.22898 11.2046 6.10971 10.7664C5.83715 9.76496 6.59109 8.77838 7.62893 8.77838H27.1235C28.2557 8.77838 29.0782 9.85466 28.7808 10.9471C28.6942 11.2653 28.6503 11.5937 28.6503 11.9235V16C28.6503 20.9706 24.6209 25 19.6503 25H15.2894C10.3188 25 6.28941 20.9706 6.28941 16Z" fill="#8CC840" stroke="#518B1A" stroke-width="2"/>
  <path d="M6.28931 8.52507C6.28931 8.48607 6.29617 8.45885 6.30237 8.44303C6.30808 8.42845 6.31343 8.42243 6.31646 8.41949C7.29973 7.46384 10.947 4.41052 17.4698 4.41052C23.9925 4.41052 27.6398 7.46383 28.6231 8.41949C28.6261 8.42243 28.6315 8.42845 28.6372 8.44303C28.6434 8.45885 28.6502 8.48607 28.6502 8.52507C28.6502 8.69336 28.5145 8.8282 28.348 8.8282H28.3386H28.3292H28.3198H28.3104H28.3009H28.2913H28.2818H28.2721H28.2625H28.2528H28.2431H28.2333H28.2235H28.2137H28.2038H28.1938H28.1839H28.1739H28.1638H28.1538H28.1436H28.1335H28.1233H28.1131H28.1028H28.0925H28.0821H28.0717H28.0613H28.0508H28.0403H28.0298H28.0192H28.0085H27.9979H27.9871H27.9764H27.9656H27.9548H27.9439H27.933H27.922H27.911H27.9H27.8889H27.8778H27.8667H27.8555H27.8442H27.833H27.8217H27.8103H27.7989H27.7875H27.776H27.7645H27.7529H27.7413H27.7297H27.718H27.7063H27.6945H27.6827H27.6708H27.6589H27.647H27.635H27.623H27.611H27.5989H27.5867H27.5746H27.5623H27.5501H27.5378H27.5254H27.513H27.5006H27.4881H27.4756H27.4631H27.4505H27.4378H27.4251H27.4124H27.3996H27.3868H27.374H27.3611H27.3481H27.3352H27.3221H27.3091H27.296H27.2828H27.2696H27.2564H27.2431H27.2298H27.2164H27.203H27.1895H27.1761H27.1625H27.1489H27.1353H27.1216H27.1079H27.0942H27.0804H27.0665H27.0526H27.0387H27.0247H27.0107H26.9967H26.9826H26.9684H26.9542H26.94H26.9257H26.9114H26.897H26.8826H26.8681H26.8536H26.8391H26.8245H26.8098H26.7952H26.7804H26.7657H26.7509H26.736H26.7211H26.7061H26.6912H26.6761H26.661H26.6459H26.6307H26.6155H26.6002H26.5849H26.5696H26.5542H26.5387H26.5233H26.5077H26.4921H26.4765H26.4608H26.4451H26.4294H26.4135H26.3977H26.3818H26.3658H26.3499H26.3338H26.3177H26.3016H26.2854H26.2692H26.2529H26.2366H26.2203H26.2038H26.1874H26.1709H26.1543H26.1377H26.1211H26.1044H26.0877H26.0709H26.0541H26.0372H26.0203H26.0033H25.9863H25.9692H25.9521H25.935H25.9178H25.9005H25.8832H25.8659H25.8485H25.831H25.8135H25.796H25.7784H25.7608H25.7431H25.7254H25.7076H25.6898H25.6719H25.654H25.636H25.618H25.5999H25.5818H25.5637H25.5455H25.5272H25.5089H25.4906H25.4722H25.4537H25.4352H25.4167H25.3981H25.3794H25.3607H25.342H25.3232H25.3044H25.2855H25.2665H25.2475H25.2285H25.2094H25.1903H25.1711H25.1519H25.1326H25.1133H25.0939H25.0745H25.055H25.0354H25.0159H24.9962H24.9766H24.9568H24.9371H24.9172H24.8973H24.8774H24.8574H24.8374H24.8173H24.7972H24.777H24.7568H24.7365H24.7162H24.6958H24.6754H24.6549H24.6344H24.6138H24.5932H24.5725H24.5517H24.531H24.5101H24.4892H24.4683H24.4473H24.4263H24.4052H24.384H24.3628H24.3416H24.3203H24.299H24.2776H24.2561H24.2346H24.2131H24.1914H24.1698H24.1481H24.1263H24.1045H24.0827H24.0607H24.0388H24.0167H23.9947H23.9726H23.9504H23.9282H23.9059H23.8835H23.8612H23.8387H23.8162H23.7937H23.7711H23.7484H23.7257H23.703H23.6802H23.6573H23.6344H23.6115H23.5884H23.5654H23.5422H23.5191H23.4958H23.4726H23.4492H23.4258H23.4024H23.3789H23.3554H23.3317H23.3081H23.2844H23.2606H23.2368H23.2129H23.189H23.165H23.141H23.1169H23.0928H23.0686H23.0443H23.02H22.9957H22.9713H22.9468H22.9223H22.8977H22.8731H22.8484H22.8237H22.7989H22.774H22.7491H22.7242H22.6992H22.6741H22.649H22.6238H22.5986H22.5733H22.548H22.5226H22.4971H22.4716H22.446H22.4204H22.3948H22.369H22.3432H22.3174H22.2915H22.2656H22.2396H22.2135H22.1874H22.1612H22.135H22.1087H22.0824H22.056H22.0295H22.003H21.9765H21.9498H21.9232H21.8964H21.8696H21.8428H21.8159H21.7889H21.7619H21.7349H21.7077H21.6805H21.6533H21.626H21.5987H21.5712H21.5438H21.5162H21.4887H21.461H21.4333H21.4056H21.3778H21.3499H21.322H21.294H21.266H21.2379H21.2097H21.1815H21.1532H21.1249H21.0965H21.0681H21.0396H21.011H20.9824H20.9537H20.925H20.8962H20.8673H20.8384H20.8095H20.7804H20.7514H20.7222H20.693H20.6638H20.6344H20.6051H20.5756H20.5461H20.5166H20.487H20.4573H20.4276H20.3978H20.368H20.3381H20.3081H20.2781H20.248H20.2179H20.1877H20.1574H20.1271H20.0967H20.0663H20.0358H20.0052H19.9746H19.9439H19.9132H19.8824H19.8515H19.8206H19.7897H19.7586H19.7275H19.6964H19.6652H19.6339H19.6026H19.5712H19.5397H19.5082H19.4766H19.445H19.4133H19.3815H19.3497H19.3178H19.2859H19.2539H19.2218H19.1897H19.1575H19.1253H19.093H19.0606H19.0282H18.9957H18.9632H18.9306H18.8979H18.8652H18.8324H18.7995H18.7666H18.7336H18.7006H18.6675H18.6343H18.6011H18.5678H18.5345H18.501H18.4676H18.434H18.4004H18.3668H18.3331H18.2993H18.2654H18.2315H18.1976H18.1635H18.1294H18.0953H18.0611H18.0268H17.9925H17.958H17.9236H17.889H17.8545H17.8198H17.7851H17.7503H17.7154H17.6805H17.6456H17.6105H17.5754H17.5403H17.5051H17.4698H17.4345H17.3993H17.3641H17.329H17.294H17.259H17.2241H17.1892H17.1545H17.1197H17.0851H17.0505H17.0159H16.9815H16.9471H16.9127H16.8785H16.8442H16.8101H16.776H16.742H16.708H16.6741H16.6402H16.6065H16.5727H16.5391H16.5055H16.472H16.4385H16.4051H16.3717H16.3384H16.3052H16.2721H16.239H16.2059H16.1729H16.14H16.1072H16.0744H16.0416H16.009H15.9764H15.9438H15.9113H15.8789H15.8465H15.8142H15.782H15.7498H15.7177H15.6856H15.6536H15.6217H15.5898H15.558H15.5262H15.4945H15.4629H15.4313H15.3998H15.3684H15.337H15.3056H15.2744H15.2432H15.212H15.1809H15.1499H15.1189H15.088H15.0571H15.0263H14.9956H14.9649H14.9343H14.9038H14.8733H14.8428H14.8124H14.7821H14.7519H14.7217H14.6915H14.6615H14.6314H14.6015H14.5716H14.5417H14.5119H14.4822H14.4525H14.4229H14.3934H14.3639H14.3345H14.3051H14.2758H14.2465H14.2173H14.1882H14.1591H14.1301H14.1011H14.0722H14.0433H14.0146H13.9858H13.9571H13.9285H13.9H13.8715H13.843H13.8146H13.7863H13.758H13.7298H13.7017H13.6736H13.6455H13.6176H13.5896H13.5618H13.534H13.5062H13.4785H13.4509H13.4233H13.3958H13.3683H13.3409H13.3135H13.2862H13.259H13.2318H13.2047H13.1776H13.1506H13.1236H13.0967H13.0699H13.0431H13.0164H12.9897H12.9631H12.9365H12.91H12.8836H12.8572H12.8308H12.8045H12.7783H12.7521H12.726H12.7H12.674H12.648H12.6221H12.5963H12.5705H12.5448H12.5191H12.4935H12.4679H12.4424H12.417H12.3916H12.3662H12.341H12.3157H12.2906H12.2654H12.2404H12.2154H12.1904H12.1655H12.1407H12.1159H12.0911H12.0664H12.0418H12.0172H11.9927H11.9683H11.9439H11.9195H11.8952H11.8709H11.8468H11.8226H11.7985H11.7745H11.7505H11.7266H11.7027H11.6789H11.6551H11.6314H11.6078H11.5842H11.5606H11.5371H11.5137H11.4903H11.467H11.4437H11.4205H11.3973H11.3742H11.3511H11.3281H11.3051H11.2822H11.2593H11.2365H11.2138H11.1911H11.1684H11.1458H11.1233H11.1008H11.0784H11.056H11.0337H11.0114H10.9892H10.967H10.9449H10.9228H10.9008H10.8788H10.8569H10.835H10.8132H10.7914H10.7697H10.7481H10.7265H10.7049H10.6834H10.662H10.6406H10.6192H10.5979H10.5767H10.5555H10.5344H10.5133H10.4922H10.4712H10.4503H10.4294H10.4086H10.3878H10.3671H10.3464H10.3257H10.3052H10.2846H10.2641H10.2437H10.2233H10.203H10.1827H10.1625H10.1423H10.1222H10.1021H10.0821H10.0621H10.0422H10.0223H10.0025H9.9827H9.96297H9.94329H9.92367H9.90409H9.88456H9.86508H9.84565H9.82627H9.80694H9.78765H9.76842H9.74924H9.73011H9.71102H9.69199H9.673H9.65406H9.63517H9.61633H9.59754H9.5788H9.56011H9.54147H9.52287H9.50432H9.48583H9.46738H9.44898H9.43062H9.41232H9.39406H9.37586H9.3577H9.33958H9.32152H9.30351H9.28554H9.26762H9.24975H9.23193H9.21415H9.19643H9.17875H9.16112H9.14353H9.12599H9.10851H9.09106H9.07367H9.05632H9.03903H9.02177H9.00457H8.98741H8.9703H8.95324H8.93622H8.91925H8.90233H8.88546H8.86863H8.85185H8.83511H8.81843H8.80179H8.78519H8.76864H8.75214H8.73569H8.71928H8.70292H8.6866H8.67033H8.65411H8.63793H8.6218H8.60572H8.58968H8.57369H8.55774H8.54184H8.52598H8.51017H8.49441H8.47869H8.46302H8.44739H8.43181H8.41628H8.40079H8.38534H8.36994H8.35459H8.33928H8.32402H8.3088H8.29363H8.2785H8.26341H8.24838H8.23338H8.21843H8.20353H8.18867H8.17386H8.15909H8.14436H8.12968H8.11505H8.10046H8.08591H8.07141H8.05695H8.04253H8.02816H8.01384H7.99956H7.98532H7.97113H7.95698H7.94287H7.92881H7.91479H7.90082H7.88689H7.873H7.85916H7.84536H7.8316H7.81789H7.80422H7.7906H7.77701H7.76348H7.74998H7.73653H7.72312H7.70975H7.69643H7.68315H7.66991H7.65672H7.64356H7.63046H7.61739H7.60437H7.59139H7.57845H7.56555H7.5527H7.53989H7.52712H7.51439H7.50171H7.48907H7.47647H7.46391H7.4514H7.43893H7.42649H7.41411H7.40176H7.38945H7.37719H7.36497H7.35279H7.34065H7.32855H7.3165H7.30448H7.29251H7.28058H7.26869H7.25684H7.24504H7.23327H7.22155H7.20986H7.19822H7.18662H7.17506H7.16354H7.15206H7.14063H7.12923H7.11787H7.10656H7.09528H7.08405H7.07285H7.0617H7.05059H7.03952H7.02848H7.01749H7.00654H6.99563H6.98476H6.97393H6.96314H6.95238H6.94167H6.931H6.92037H6.90978H6.89923H6.88871H6.87824H6.86781H6.85741H6.84706H6.83675H6.82647H6.81623H6.80604H6.79588H6.78576H6.77568H6.76564H6.75564H6.74568H6.73576H6.72587H6.71603H6.70622H6.69645H6.68673H6.67704H6.66738H6.65777H6.6482H6.63866H6.62916H6.6197H6.61028H6.6009H6.59155C6.42502 8.8282 6.28931 8.69336 6.28931 8.52507Z" fill="#FED800" stroke="#518B1A" stroke-width="2" stroke-linejoin="round"/>
  <path d="M5.28889 10.5289H1.68761C1.30785 10.5289 1 10.8367 1 11.2165V11.2165C1 11.5962 1.30785 11.9041 1.68761 11.9041H5.632" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M29.6491 10.5289H33.2504C33.6302 10.5289 33.938 10.8367 33.938 11.2165V11.2165C33.938 11.5962 33.6302 11.9041 33.2504 11.9041H29.306" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const Diary = () => {
  const svgMarkup = `
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.8153 1H5.58451C3.71528 1 2.19997 2.3991 2.19996 4.12498L2.19994 7.1001L2.19991 11.1001L2.19988 15.1001L2.19986 19.1001L2.19983 22.8749C2.19982 24.6008 3.71513 25.9999 5.58436 25.9999L20.8149 26C22.6841 26 24.1994 24.6009 24.1994 22.8751L24.1998 4.12506C24.1999 2.39915 22.6845 1 20.8153 1Z" fill="#8CC840"/>
  <path d="M1 7.1001H3M1 11.1001H3M1 15.1001H3M1 19.1001H3M5.58451 1H20.8153C22.6845 1 24.1999 2.39915 24.1998 4.12506L24.1994 22.8751C24.1994 24.6009 22.6841 26 20.8149 26L5.58436 25.9999C3.71513 25.9999 2.19982 24.6008 2.19983 22.8749L2.19996 4.12498C2.19997 2.3991 3.71528 1 5.58451 1Z" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25.0002 12.4126H19.5002C18.3957 12.4126 17.5002 13.308 17.5002 14.4126V15.1001C17.5002 16.2047 18.3957 17.1001 19.5002 17.1001H24.1999H25.0002C25.5525 17.1001 26.0002 16.6524 26.0002 16.1001V13.4126C26.0002 12.8603 25.5525 12.4126 25.0002 12.4126Z" fill="#FED800" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.84737 9.46229C9.21844 8.83336 9.16542 7.83124 9.72448 7.13946C10.3471 6.36901 11.4866 6.27349 12.2288 6.92953L12.5251 7.19144C12.7921 7.42741 13.1931 7.42741 13.46 7.19145L13.7564 6.92949C14.4987 6.27347 15.6381 6.36902 16.2607 7.13948C16.8198 7.83125 16.7668 8.83334 16.1378 9.46226L13.6997 11.9004C13.3092 12.2909 12.676 12.2909 12.2855 11.9004L9.84737 9.46229Z" fill="#FED800" stroke="#518B1A" stroke-width="2" stroke-linejoin="round"/>
  </svg>
  
    `;

  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const Profile = () => {
  const svgMarkup = `
  <svg width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7207 9.15605C19.7207 11.1962 20.4757 13.2284 21.8039 14.7752C23.1958 16.3963 24 18.3759 24 20.5016C24 25.7492 18.9983 30.25 12.5 30.25C6.00173 30.25 1 25.7492 1 20.5016C1 18.3759 1.80416 16.3963 3.19607 14.7752C4.52427 13.2284 5.27928 11.1962 5.27928 9.15605C5.27928 4.24247 8.58823 1 12.5 1C16.4118 1 19.7207 4.24247 19.7207 9.15605Z" fill="#8CC840" stroke="#518B1A" stroke-width="2"/>
<path d="M10.0818 8.75H10V7.5H10.0818V8.75Z" fill="#8CC840"/>
<path d="M15 8.75H14.9273V7.5H15V8.75Z" fill="#8CC840"/>
<path d="M10.0818 8.75H10V7.5H10.0818V8.75Z" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 8.75H14.9273V7.5H15V8.75Z" stroke="#518B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="12.5" cy="20" r="5" fill="#FED800" stroke="#518B1A" stroke-width="2"/>
</svg>
    `;
  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};
const Weather = () => {
  const svgMarkup = `
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.9933 7.13269L5.7446 8.10127C6.22828 8.22547 6.72945 7.9738 6.91871 7.51167L5.9933 7.13269ZM2.11352 7.20762C2.33063 7.71544 2.9183 7.95111 3.42612 7.734C3.93394 7.51689 4.16961 6.92921 3.9525 6.42139L2.11352 7.20762ZM4.61363 2.88142L5.00605 3.80121L4.61363 2.88142ZM3.49776 2.81519C3.71487 3.32301 4.30254 3.55868 4.81036 3.34157C5.31818 3.12446 5.55385 2.53679 5.33674 2.02897L3.49776 2.81519ZM4.7476 0.650954C4.53049 0.143134 3.94281 -0.0925337 3.43499 0.124576C2.92717 0.341686 2.6915 0.929359 2.90861 1.43718L4.7476 0.650954ZM6.35926 2.01766C6.15332 2.53011 6.40179 3.11249 6.91424 3.31843C7.42669 3.52437 8.00907 3.2759 8.21501 2.76345L6.35926 2.01766ZM8.77384 1.37289C8.97979 0.860442 8.73131 0.278069 8.21886 0.0721257C7.70641 -0.133817 7.12404 0.114656 6.9181 0.627107L8.77384 1.37289ZM1.39022 2.98493C0.877617 2.77936 0.295424 3.02825 0.0898525 3.54085C-0.115719 4.05345 0.133176 4.63565 0.645776 4.84122L1.39022 2.98493ZM2.03779 5.39947C2.55039 5.60504 3.13258 5.35614 3.33816 4.84354C3.54373 4.33094 3.29483 3.74875 2.78223 3.54318L2.03779 5.39947ZM7.26526 4.28585C7.63925 4.69224 8.27187 4.71851 8.67826 4.34452C9.08465 3.97053 9.11091 3.33791 8.73692 2.93152L7.26526 4.28585ZM16 9.2917C16 11.8909 13.8906 14 11.2857 14V16C14.9933 16 18 12.9973 18 9.2917H16ZM11.2857 4.5834C13.8906 4.5834 16 6.69252 16 9.2917H18C18 5.5861 14.9933 2.5834 11.2857 2.5834V4.5834ZM6.91871 7.51167C7.62268 5.7927 9.31439 4.5834 11.2857 4.5834V2.5834C8.47579 2.5834 6.06928 4.30852 5.0679 6.75371L6.91871 7.51167ZM5 8.00838C5.26013 8.00838 5.50915 8.04081 5.7446 8.10127L6.24201 6.16411C5.84352 6.06179 5.42737 6.00838 5 6.00838V8.00838ZM2 11.0042C2 9.35042 3.34157 8.00838 5 8.00838V6.00838C2.23879 6.00838 0 8.24406 0 11.0042H2ZM5 14C3.34157 14 2 12.658 2 11.0042H0C0 13.7643 2.23879 16 5 16V14ZM11.2857 14H5V16H11.2857V14ZM3.9525 6.42139C3.51924 5.408 3.98997 4.2347 5.00605 3.80121L4.22122 1.96163C2.18988 2.82828 1.24527 5.17679 2.11352 7.20762L3.9525 6.42139ZM5.33674 2.02897L4.7476 0.650954L2.90861 1.43718L3.49776 2.81519L5.33674 2.02897ZM8.21501 2.76345L8.77384 1.37289L6.9181 0.627107L6.35926 2.01766L8.21501 2.76345ZM0.645776 4.84122L2.03779 5.39947L2.78223 3.54318L1.39022 2.98493L0.645776 4.84122ZM5.00605 3.80121C5.80591 3.45995 6.70681 3.67902 7.26526 4.28585L8.73692 2.93152C7.6226 1.72066 5.82385 1.27789 4.22122 1.96163L5.00605 3.80121Z" fill="#1A1A1A"/>
</svg>
    `;
  const SvgComponent = () => <SvgXml xml={svgMarkup} width="27" height="27" />;
  return <SvgComponent />;
};


const SVGicon = {
  Home,
  Community,
  Diary,
  Menu,
  Profile,
  HomeOutline,
  CommunityOutline,
  MenuOutline,
  DiaryOutline,
  ProfileOutline,
  Weather
};
export default SVGicon;
