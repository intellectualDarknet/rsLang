import React from "react";
import { AudioService } from "../../utils/audio-service";
type IconType =
  | "settings"
  | "log-out"
  | "logo"
  | "icon"
  | "greetings"
  | "info"
  | "loading"
  | "sound"
  | "basket";

export interface IconProps {
  type: IconType;
  width?: number;
  height?: number;
  url?: string;
  audioExample?: string;
  audioMeaning?: string;
}

export function Icon({
  type,
  width,
  height,
  url,
  audioExample,
  audioMeaning,
}: IconProps) {
  function getIcon() {
    function spell(...urls: string[]) {
      AudioService.play(urls);
    }
    switch (type) {
      case "info":
        return (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1441 20.0812C13.831 20.0812 14.3878 19.5244 14.3878 18.8375C14.3878 18.1506 13.831 17.5938 13.1441 17.5938C12.4572 17.5938 11.9004 18.1506 11.9004 18.8375C11.9004 19.5244 12.4572 20.0812 13.1441 20.0812Z"
              fill="#7D7D7D"
            />
            <path
              d="M13.144 0.00756836C6.10536 0.00756836 0.408325 5.70366 0.408325 12.7433C0.408325 19.7819 6.10442 25.479 13.144 25.479C20.1827 25.479 25.8797 19.7829 25.8797 12.7433C25.8797 5.70461 20.1836 0.00756836 13.144 0.00756836ZM13.144 23.489C7.20516 23.489 2.39828 18.6829 2.39828 12.7433C2.39828 6.8044 7.20437 1.99752 13.144 1.99752C19.0829 1.99752 23.8898 6.80361 23.8898 12.7433C23.8898 18.6821 19.0837 23.489 13.144 23.489Z"
              fill="#7D7D7D"
            />
            <path
              d="M13.1441 6.40015C10.9496 6.40015 9.16418 8.18553 9.16418 10.3801C9.16418 10.9296 9.60964 11.375 10.1592 11.375C10.7087 11.375 11.1541 10.9296 11.1541 10.3801C11.1541 9.28279 12.0468 8.3901 13.1441 8.3901C14.2414 8.3901 15.134 9.28279 15.134 10.3801C15.134 11.4773 14.2414 12.37 13.1441 12.37C12.5946 12.37 12.1491 12.8155 12.1491 13.365V15.8524C12.1491 16.402 12.5946 16.8474 13.1441 16.8474C13.6936 16.8474 14.1391 16.402 14.1391 15.8524V14.234C15.8537 13.7911 17.124 12.2312 17.124 10.3801C17.124 8.18553 15.3386 6.40015 13.1441 6.40015Z"
              fill="#7D7D7D"
            />
          </svg>
        );
      case "sound":
        return (
          <svg
            onClick={() => {
              spell(url, audioExample, audioMeaning);
            }}
            className="popup__svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_448_10)">
              <path
                d="M17.9015 0.745403C17.5607 0.572304 17.1518 0.606897 16.8452 0.84925L7.84972 7.53153H1.78463C1.20542 7.53153 0.762451 7.98165 0.762451 8.57026V20.1344C0.762451 20.723 1.20542 21.173 1.78463 21.173H7.84972L16.8111 27.8553C16.9814 27.9938 17.1859 28.0631 17.4244 28.0631C17.5947 28.0631 17.731 28.0285 17.9014 27.9592C18.2421 27.7861 18.4466 27.4399 18.4466 27.0244V1.68022C18.4466 1.29936 18.2422 0.918503 17.9015 0.745403ZM7.16825 19.0957H2.80687V9.60893H7.16825V19.0957ZM16.4022 24.9816L9.21267 19.615V9.08956L16.4022 3.72295V24.9816Z"
                fill="#7D7D7D"
              />
              <path
                d="M22.331 18.6109C24.0687 17.8492 25.0909 16.2565 25.0909 14.3523C25.0909 12.4481 24.0687 10.8554 22.331 10.0937C21.8199 9.85134 21.2065 10.0937 20.968 10.6131C20.7295 11.1324 20.968 11.7556 21.4792 11.998C22.4673 12.4481 23.0125 13.3137 23.0125 14.387C23.0125 15.4603 22.4673 16.3259 21.4792 16.776C20.968 17.0183 20.7295 17.6415 20.968 18.1609C21.1384 18.5418 21.5132 18.7841 21.888 18.7841C22.0584 18.7148 22.1947 18.6802 22.331 18.6109Z"
                fill="#7D7D7D"
              />
              <path
                d="M22.4673 6.25048C21.9222 6.14664 21.377 6.49283 21.2747 7.08145C21.1725 7.63541 21.5132 8.18937 22.0925 8.29328C24.9206 8.84724 26.965 11.4093 26.965 14.3869C26.965 17.3646 24.9206 19.892 22.0925 20.4806C21.5473 20.5845 21.1725 21.1385 21.2747 21.6924C21.3769 22.1772 21.7858 22.5234 22.2629 22.5234C22.331 22.5234 22.3992 22.5234 22.4673 22.4888C26.2495 21.6925 28.9754 18.2994 28.9754 14.3524C28.9754 10.4053 26.2495 6.97761 22.4673 6.25048Z"
                fill="#7D7D7D"
              />
            </g>
            <defs>
              <clipPath id="clip0_448_10">
                <rect
                  width="28.2129"
                  height="28.668"
                  fill="white"
                  transform="translate(0.762451 0.0161133)"
                />
              </clipPath>
            </defs>
          </svg>
        );

      case "settings":
        return (
          <svg
            width={width ?? 29}
            height={height ?? 28}
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2231 28H13.4658C12.0445 28 10.8882 26.8437 10.8882 25.4224V24.8279C10.2839 24.6349 9.69687 24.3912 9.13287 24.0993L8.71156 24.5206C7.69115 25.5423 6.05659 25.5123 5.06582 24.5202L3.82381 23.2783C2.83129 22.2869 2.80274 20.6528 3.82414 19.6325L4.24512 19.2116C3.95326 18.6476 3.70962 18.0606 3.51652 17.4563H2.92207C1.50085 17.4563 0.344482 16.2999 0.344482 14.8787V13.1213C0.344482 11.7001 1.50085 10.5437 2.92212 10.5437H3.51658C3.70968 9.93945 3.95331 9.35244 4.24518 8.78845L3.82387 8.36719C2.80307 7.34748 2.83123 5.71331 3.82419 4.72145L5.06631 3.47938C6.05938 2.48495 7.69355 2.46012 8.712 3.47971L9.13293 3.90064C9.69692 3.60883 10.284 3.36514 10.8882 3.17204V2.57759C10.8882 1.15631 12.0445 0 13.4659 0H15.2231C16.6444 0 17.8007 1.15631 17.8007 2.57759V3.17209C18.405 3.36514 18.992 3.60883 19.556 3.9007L19.9774 3.47938C20.9978 2.45771 22.6323 2.48768 23.6231 3.47977L24.8651 4.72172C25.8576 5.71315 25.8862 7.34716 24.8648 8.36746L24.4438 8.78845C24.7357 9.35244 24.9793 9.9394 25.1724 10.5437H25.7668C27.1881 10.5437 28.3445 11.7001 28.3445 13.1213V14.8787C28.3445 16.2999 27.1881 17.4563 25.7668 17.4563H25.1724C24.9793 18.0605 24.7357 18.6476 24.4438 19.2116L24.8651 19.6329C25.8859 20.6526 25.8577 22.2867 24.8648 23.2786L23.6227 24.5207C22.6296 25.5151 20.9954 25.5399 19.977 24.5203L19.556 24.0994C18.992 24.3912 18.405 24.6349 17.8007 24.828V25.4225C17.8007 26.8437 16.6444 28 15.2231 28ZM9.40713 22.3765C10.1906 22.8399 11.0339 23.1899 11.9135 23.4169C12.2758 23.5104 12.5289 23.8371 12.5289 24.2112V25.4224C12.5289 25.939 12.9492 26.3594 13.4659 26.3594H15.2231C15.7398 26.3594 16.1602 25.939 16.1602 25.4224V24.2112C16.1602 23.8371 16.4133 23.5104 16.7755 23.4169C17.6551 23.1899 18.4984 22.8399 19.2819 22.3765C19.6043 22.1858 20.0147 22.2377 20.2796 22.5025L21.1375 23.3605C21.5074 23.7309 22.1014 23.7223 22.4622 23.3609L23.7051 22.1181C24.0651 21.7586 24.0771 21.1644 23.7055 20.7933L22.8471 19.935C22.5823 19.6702 22.5305 19.2597 22.7211 18.9374C23.1844 18.1539 23.5344 17.3106 23.7615 16.431C23.855 16.0687 24.1817 15.8157 24.5557 15.8157H25.7669C26.2835 15.8157 26.7039 15.3954 26.7039 14.8787V13.1214C26.7039 12.6048 26.2835 12.1844 25.7669 12.1844H24.5557C24.1816 12.1844 23.855 11.9313 23.7615 11.5691C23.5344 10.6895 23.1844 9.84621 22.7211 9.06276C22.5305 8.74043 22.5823 8.32995 22.8471 8.06515L23.7051 7.20716C24.076 6.8367 24.0663 6.2428 23.7055 5.88235L22.4627 4.63958C22.1025 4.27886 21.5083 4.2683 21.1379 4.63925L20.2796 5.49757C20.0148 5.76242 19.6042 5.81427 19.2819 5.62362C18.4984 5.16026 17.6552 4.8102 16.7756 4.5832C16.4133 4.48973 16.1602 4.16303 16.1602 3.78891V2.57759C16.1602 2.06095 15.7398 1.64062 15.2232 1.64062H13.4659C12.9493 1.64062 12.5289 2.06095 12.5289 2.57759V3.7888C12.5289 4.16292 12.2758 4.48962 11.9136 4.58309C11.034 4.81009 10.1907 5.16015 9.40719 5.62352C9.08475 5.8141 8.67432 5.76226 8.40952 5.49746L7.55158 4.63947C7.18168 4.26912 6.58761 4.27771 6.22683 4.63909L4.98395 5.88191C4.624 6.24143 4.61197 6.8355 4.98362 7.20672L5.84194 8.06504C6.10674 8.32984 6.15858 8.74032 5.968 9.06265C5.50463 9.8461 5.15463 10.6894 4.92762 11.569C4.83411 11.9313 4.5074 12.1843 4.13334 12.1843H2.92212C2.40549 12.1844 1.98511 12.6047 1.98511 13.1213V14.8787C1.98511 15.3953 2.40549 15.8156 2.92212 15.8156H4.13329C4.5074 15.8156 4.83405 16.0687 4.92757 16.4309C5.15458 17.3106 5.50463 18.1538 5.96794 18.9373C6.15853 19.2596 6.10669 19.6701 5.84189 19.9349L4.9839 20.7929C4.61301 21.1634 4.62269 21.7573 4.98357 22.1177L6.22634 23.3605C6.58657 23.7212 7.18069 23.7318 7.55115 23.3608L8.40941 22.5025C8.60454 22.3074 9.01048 22.1419 9.40713 22.3765Z"
              fill="#7D7D7D"
            />
            <path
              d="M14.3444 20.0921C10.9851 20.0921 8.2522 17.3592 8.2522 14C8.2522 10.6407 10.9851 7.90778 14.3444 7.90778C17.7037 7.90778 20.4366 10.6407 20.4366 14C20.4366 17.3592 17.7037 20.0921 14.3444 20.0921ZM14.3444 9.5484C11.8897 9.5484 9.89282 11.5454 9.89282 14C9.89282 16.4546 11.8898 18.4515 14.3444 18.4515C16.799 18.4515 18.7959 16.4546 18.7959 14C18.7959 11.5454 16.799 9.5484 14.3444 9.5484Z"
              fill="#7D7D7D"
            />
          </svg>
        );
      case "log-out":
        return (
          <svg
            width="28"
            height="28"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.07228 0.5H19.6045C20.9999 0.5 22.135 1.63516 22.135 3.03047V6.40442H20.448V3.03047C20.448 2.56536 20.0696 2.18698 19.6045 2.18698H3.07223C2.60713 2.18698 2.22875 2.56536 2.22875 3.03047V19.5628C2.22875 20.0279 2.60713 20.4063 3.07223 20.4063H19.6045C20.0696 20.4063 20.448 20.0279 20.448 19.5628V16.1888H22.135V19.5628C22.135 20.9581 20.9999 22.0932 19.6045 22.0932H3.07223C1.67693 22.0932 0.54177 20.9581 0.54177 19.5628V3.03047C0.541812 1.63516 1.67697 0.5 3.07228 0.5Z"
              fill="#7D7D7D"
            />
            <path
              d="M6.78385 10.4531H18.918L15.7128 7.24782L16.9056 6.05499L22.1472 11.2965L16.9056 16.5382L15.7128 15.3453L18.918 12.1401H6.78385V10.4531Z"
              fill="#7D7D7D"
            />
          </svg>
        );
      case "logo":
        return (
          <svg
            width="175"
            height="70"
            viewBox="0 0 175 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.7575 69.5149C53.9535 69.5149 69.515 53.9534 69.515 34.7574C69.515 15.5614 53.9535 -9.93677e-05 34.7575 -9.95966e-05C15.5615 -9.98255e-05 6.43389e-07 15.5614 4.14479e-07 34.7574L0 69.5149L34.7575 69.5149Z"
              fill="#404497"
            />
            <path
              d="M30.3037 46.5706L26.077 40.4654H25.8265H21.412V46.5706H16.34V24.6545H25.8265C27.7677 24.6545 29.4479 24.978 30.8672 25.625C32.3074 26.2721 33.4137 27.1905 34.186 28.3802C34.9582 29.5699 35.3444 30.9788 35.3444 32.6069C35.3444 34.2349 34.9478 35.6438 34.1546 36.8336C33.3824 38.0024 32.2761 38.8999 30.8359 39.5261L35.7514 46.5706H30.3037ZM30.2098 32.6069C30.2098 31.3754 29.8132 30.4361 29.02 29.7891C28.2269 29.1212 27.0684 28.7872 25.5448 28.7872H21.412V36.4265H25.5448C27.0684 36.4265 28.2269 36.0926 29.02 35.4247C29.8132 34.7567 30.2098 33.8175 30.2098 32.6069ZM46.5639 46.9463C44.8315 46.9463 43.1513 46.7167 41.5232 46.2575C39.916 45.7774 38.6219 45.1617 37.6409 44.4103L39.3629 40.5906C40.3022 41.2794 41.4188 41.8325 42.7129 42.25C44.007 42.6674 45.3011 42.8761 46.5952 42.8761C48.0354 42.8761 49.0999 42.6674 49.7887 42.25C50.4775 41.8116 50.8219 41.2376 50.8219 40.528C50.8219 40.0062 50.6132 39.5783 50.1957 39.2443C49.7991 38.8895 49.2773 38.6077 48.6303 38.399C48.0041 38.1903 47.1483 37.9607 46.063 37.7102C44.3932 37.3136 43.026 36.917 41.9615 36.5205C40.897 36.1239 39.9786 35.4873 39.2064 34.6106C38.4549 33.734 38.0792 32.5651 38.0792 31.1041C38.0792 29.8308 38.4236 28.6829 39.1124 27.6601C39.8012 26.6165 40.8344 25.792 42.212 25.1867C43.6104 24.5814 45.3116 24.2788 47.3153 24.2788C48.7138 24.2788 50.0809 24.4457 51.4167 24.7797C52.7526 25.1137 53.9214 25.5937 54.9233 26.2199L53.3579 30.0709C51.3333 28.9229 49.3086 28.3489 47.284 28.3489C45.8647 28.3489 44.8106 28.5785 44.1218 29.0377C43.4539 29.4969 43.1199 30.1022 43.1199 30.8536C43.1199 31.605 43.5061 32.1686 44.2784 32.5443C45.0715 32.8991 46.2717 33.2539 47.8789 33.6088C49.5487 34.0053 50.9158 34.4019 51.9803 34.7985C53.0448 35.1951 53.9528 35.8212 54.7042 36.677C55.4764 37.5328 55.8626 38.6912 55.8626 40.1523C55.8626 41.4046 55.5078 42.5526 54.7981 43.5962C54.1093 44.619 53.0657 45.433 51.6672 46.0383C50.2688 46.6436 48.5677 46.9463 46.5639 46.9463Z"
              fill="white"
            />
            <path
              d="M85.9285 24.6545H91.0005V42.4378H101.99V46.5706H85.9285V24.6545ZM111.457 29.476C114.066 29.476 116.07 30.1022 117.468 31.3545C118.867 32.586 119.566 34.4541 119.566 36.9588V46.5706H114.995V44.4729C114.076 46.0383 112.365 46.821 109.86 46.821C108.566 46.821 107.439 46.6019 106.479 46.1635C105.539 45.7252 104.819 45.1199 104.318 44.3476C103.817 43.5754 103.567 42.6987 103.567 41.7177C103.567 40.1523 104.151 38.9208 105.32 38.0233C106.51 37.1258 108.336 36.677 110.799 36.677H114.682C114.682 35.6125 114.358 34.7985 113.711 34.2349C113.064 33.6505 112.093 33.3583 110.799 33.3583C109.902 33.3583 109.015 33.5044 108.138 33.7966C107.282 34.0679 106.552 34.4437 105.946 34.9237L104.193 31.5111C105.112 30.864 106.207 30.3631 107.481 30.0083C108.775 29.6534 110.1 29.476 111.457 29.476ZM111.081 43.5336C111.916 43.5336 112.657 43.3458 113.304 42.9701C113.951 42.5735 114.41 41.9995 114.682 41.2481V39.5261H111.332C109.328 39.5261 108.326 40.1836 108.326 41.4985C108.326 42.1247 108.566 42.6257 109.046 43.0014C109.547 43.3562 110.225 43.5336 111.081 43.5336ZM134.224 29.476C136.311 29.476 137.992 30.1022 139.265 31.3545C140.559 32.6069 141.206 34.4645 141.206 36.9275V46.5706H136.322V37.6789C136.322 36.343 136.03 35.3516 135.445 34.7046C134.861 34.0366 134.015 33.7027 132.909 33.7027C131.678 33.7027 130.697 34.0888 129.966 34.8611C129.236 35.6125 128.87 36.7396 128.87 38.2424V46.5706H123.986V29.7265H128.651V31.6989C129.298 30.9893 130.102 30.4466 131.062 30.0709C132.022 29.6743 133.076 29.476 134.224 29.476ZM163.193 29.7265V43.7528C163.193 46.8419 162.389 49.1379 160.782 50.6407C159.175 52.1435 156.827 52.8949 153.738 52.8949C152.11 52.8949 150.565 52.6966 149.104 52.3C147.643 51.9035 146.432 51.3295 145.472 50.5781L147.413 47.0715C148.123 47.6559 149.021 48.1151 150.106 48.4491C151.191 48.8039 152.277 48.9813 153.362 48.9813C155.053 48.9813 156.295 48.5952 157.088 47.8229C157.902 47.0715 158.309 45.9235 158.309 44.3789V43.6588C157.036 45.0573 155.261 45.7565 152.986 45.7565C151.442 45.7565 150.022 45.4226 148.728 44.7547C147.455 44.0659 146.443 43.1057 145.691 41.8743C144.94 40.6428 144.564 39.2234 144.564 37.6163C144.564 36.0091 144.94 34.5898 145.691 33.3583C146.443 32.1268 147.455 31.1771 148.728 30.5092C150.022 29.8204 151.442 29.476 152.986 29.476C155.428 29.476 157.286 30.2796 158.559 31.8868V29.7265H163.193ZM153.957 41.749C155.251 41.749 156.305 41.3733 157.119 40.6219C157.954 39.8496 158.371 38.8477 158.371 37.6163C158.371 36.3848 157.954 35.3934 157.119 34.6419C156.305 33.8697 155.251 33.4835 153.957 33.4835C152.663 33.4835 151.598 33.8697 150.763 34.6419C149.929 35.3934 149.511 36.3848 149.511 37.6163C149.511 38.8477 149.929 39.8496 150.763 40.6219C151.598 41.3733 152.663 41.749 153.957 41.749Z"
              fill="black"
            />
          </svg>
        );

      case "basket":
        return (
          <svg
            width="27"
            height="29"
            viewBox="0 0 27 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.9041 4.82444H18.8645V3.81875C18.8645 2.15251 17.5137 0.801758 15.8475 0.801758H11.8248C10.1586 0.801758 8.80781 2.15251 8.80781 3.81875V4.82444H1.76814C1.2127 4.82444 0.762451 5.27469 0.762451 5.83012C0.762451 6.38556 1.21276 6.83575 1.76814 6.83575H2.86127L4.78513 28.0462C4.83257 28.5656 5.26927 28.9625 5.79082 28.9604H21.8815C22.403 28.9626 22.8397 28.5657 22.8872 28.0462L24.811 6.83575H25.9042C26.4596 6.83575 26.9098 6.3855 26.9098 5.83006C26.9098 5.27463 26.4595 4.82444 25.9041 4.82444ZM10.8191 3.81875C10.8191 3.26332 11.2694 2.81307 11.8248 2.81307H15.8475C16.4029 2.81307 16.8532 3.26332 16.8532 3.81875V4.82444H10.8192V3.81875H10.8191ZM20.9633 26.949H6.709L4.88572 6.83575H9.8135H22.7916L20.9633 26.949Z"
              fill="#7D7D7D"
            />
            <path
              d="M10.8194 23.865C10.8193 23.8636 10.8192 23.8622 10.8191 23.8609L9.81344 9.78157C9.77402 9.22613 9.29177 8.80788 8.7364 8.8473C8.18097 8.88672 7.76271 9.36897 7.80213 9.92434L8.80782 24.0036C8.84535 24.531 9.28482 24.9393 9.8135 24.9379H9.88592C10.44 24.8994 10.858 24.4191 10.8194 23.865Z"
              fill="#7D7D7D"
            />
            <path
              d="M13.8361 8.84717C13.2807 8.84717 12.8304 9.29742 12.8304 9.85285V23.9321C12.8304 24.4876 13.2807 24.9378 13.8361 24.9378C14.3916 24.9378 14.8418 24.4876 14.8418 23.9321V9.85285C14.8418 9.29742 14.3916 8.84717 13.8361 8.84717Z"
              fill="#7D7D7D"
            />
            <path
              d="M18.9358 8.8473C18.3804 8.80788 17.8982 9.22613 17.8588 9.78157L16.8531 23.8609C16.8124 24.4148 17.2284 24.8968 17.7823 24.9375C17.784 24.9377 17.7857 24.9378 17.7874 24.9379H17.8588C18.3875 24.9393 18.8269 24.531 18.8645 24.0036L19.8701 9.92434C19.9096 9.36897 19.4913 8.88678 18.9358 8.8473Z"
              fill="#7D7D7D"
            />
          </svg>
        );

      case "greetings":
        return (
          <svg
            className="greetings__svg"
            width="898"
            height="205"
            viewBox="0 0 898 205"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.344482" width="897" height="205" fill="#404497" />
            <mask
              id="mask0_26_70"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="898"
              height="205"
            >
              <rect x="0.344482" width="897" height="205" fill="#404497" />
            </mask>
            <g mask="url(#mask0_26_70)">
              <path
                d="M-3.65552 204.5C-3.65552 91.5578 87.9023 0 200.844 0H405.344V204.5C405.344 317.442 313.787 409 200.844 409H-3.65552V204.5Z"
                fill="#FEC246"
              />
              <rect x="405.344" width="206" height="206" fill="#AB9FF1" />
              <path
                d="M831.344 213C831.344 95.3633 735.981 0 618.344 0C500.708 0 405.344 95.3633 405.344 213C405.344 330.637 500.708 426 618.344 426H831.344V213Z"
                fill="#6550DE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M508.844 1C452.235 1 406.344 46.8908 406.344 103.5C406.344 160.02 452.091 205.855 508.577 206V103.767H611.344C611.344 103.678 611.344 103.589 611.344 103.5C611.344 46.8908 565.454 1 508.844 1Z"
                fill="#2C9AFF"
              />
              <path
                d="M922.344 4.50227e-06C865.459 2.01574e-06 819.344 46.1147 819.344 103C819.344 159.885 865.459 206 922.344 206C979.23 206 1025.34 159.885 1025.34 103L1025.34 9.00455e-06L922.344 4.50227e-06Z"
                fill="#FFCFCF"
              />
              <path
                d="M715.344 206C772.23 206 818.344 159.885 818.344 103C818.344 46.1147 772.23 -5.49912e-07 715.344 -1.22826e-06C658.459 -1.90661e-06 612.344 46.1147 612.344 103L612.344 206L715.344 206Z"
                fill="#F56748"
              />
            </g>
          </svg>
        );
      case "loading":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="64px"
            height="64px"
            viewBox="0 0 128 128"
            xmlSpace="preserve"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
            <g>
              <circle cx="16" cy="64" r="16" fill="#6550DE" />
              <circle
                cx="16"
                cy="64"
                r="14.344"
                fill="#6550DE"
                transform="rotate(45 64 64)"
              />
              <circle
                cx="16"
                cy="64"
                r="12.531"
                fill="#6550DE"
                transform="rotate(90 64 64)"
              />
              <circle
                cx="16"
                cy="64"
                r="10.75"
                fill="#6550DE"
                transform="rotate(135 64 64)"
              />
              <circle
                cx="16"
                cy="64"
                r="10.063"
                fill="#6550DE"
                transform="rotate(180 64 64)"
              />
              <circle
                cx="16"
                cy="64"
                r="8.063"
                fill="#6550DE"
                transform="rotate(225 64 64)"
              />
              <circle
                cx="16"
                cy="64"
                r="6.438"
                fill="#6550DE"
                transform="rotate(270 64 64)"
              />
              <circle
                cx="16"
                cy="64"
                r="5.375"
                fill="#6550DE"
                transform="rotate(315 64 64)"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
                calcMode="discrete"
                dur="720ms"
                repeatCount="indefinite"
              ></animateTransform>
            </g>
          </svg>
        );

      case "icon":
        return (
          <svg
            className="icon"
            width={width ?? "100%"}
            height={height ?? "100%"}
            viewBox="0 0 171 171"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_443_1185"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="171"
              height="171"
            >
              <circle cx="85.5" cy="85.5" r="85.5" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0_443_1185)">
              <rect
                x="-8.72461"
                y="-4.09839"
                width="197.481"
                height="189.098"
                fill="#E7E7E7"
              />
              <path
                d="M70.2007 72.4537C65.4373 66.1264 58.8236 61.2763 51.4675 58.3934C46.4291 56.4187 33.6011 52.4731 28.6795 56.366C24.1347 59.9574 27.0892 73.0039 28.4383 77.6316C30.7258 85.4813 35.2517 92.7206 41.5489 97.9739C42.9168 99.1157 44.3828 100.182 46.0598 100.778L70.2007 72.4537Z"
                fill="#EE772A"
              />
              <path
                d="M130.983 63.4356C132.584 50.2496 127.565 36.472 118.03 27.2543C112.532 21.9407 109.48 22.1819 104.362 27.7404C99.885 32.6018 96.8024 38.7557 95.6869 45.2752C94.1607 54.2103 96.3652 63.7258 101.66 71.0819L130.983 63.4356Z"
                fill="#EE772A"
              />
              <path
                d="M54.3994 101.49C50.5517 107.003 46.7003 112.516 42.8527 118.03C29.3238 137.407 15.4633 157.554 11.0693 180.771C6.67521 203.993 14.4383 231.269 35.2856 242.394C44.5711 247.349 55.3603 248.634 65.882 248.936C78.2803 249.29 91.0743 248.303 102.233 242.88C113.391 237.461 122.662 226.86 123.638 214.492C124.712 200.846 116.044 188.655 109.389 176.69C97.9254 156.08 91.6094 132.633 91.1723 109.053L54.3994 101.49Z"
                fill="#F49E5A"
              />
              <path
                d="M56.3816 140.957C65.3959 146.343 76.2604 148.095 86.7293 147.311C92.9925 146.844 99.9982 144.929 102.892 139.356C106.035 133.3 102.787 125.819 98.3325 120.649C87.4227 107.983 68.1016 102.504 52.127 107.587C32.0673 113.967 43.0676 133.006 56.3816 140.957Z"
                fill="#E74041"
              />
              <path
                d="M134.785 116.473C130.561 122.141 124.957 126.437 119.097 129.961C100.906 140.904 78.3633 144.82 60.0033 135.843C41.6432 126.867 29.5878 103.129 35.9678 81.8032C39.416 70.2754 45.4154 61.3742 52.9072 54.8359C64.3559 44.8268 79.2828 40.3235 93.9084 40.3574C132.121 40.4478 168.272 71.5379 134.785 116.473Z"
                fill="#F49E5A"
              />
              <path
                d="M31.5511 235.249C26.686 238.78 8.86855 229.004 4.42926 226.736C-3.22454 222.82 -10.901 218.385 -16.2221 211.632C-21.7165 204.656 -24.1321 195.876 -24.6032 186.91C-24.7728 183.779 -24.6974 180.628 -24.4336 177.519C-24.3733 176.773 -24.2979 176.027 -24.215 175.288C-23.6573 170.352 -22.6926 165.479 -21.5997 160.633C-20.6802 156.559 -19.6702 152.504 -18.7243 148.434C-17.9104 144.941 -17.1454 141.436 -16.5349 137.905C-16.4519 137.426 -16.3766 136.933 -16.32 136.431C-16.06 134.057 -16.2371 131.555 -18.0121 130.093C-18.9015 129.358 -20.0169 129.064 -21.1776 129.045C-21.4904 129.038 -21.8032 129.053 -22.116 129.083C-22.8094 129.154 -23.4953 129.305 -24.1472 129.505C-26.8982 130.36 -29.3138 131.921 -31.6955 133.579C-33.4742 134.815 -35.2303 136.104 -37.092 137.189C-41.4446 139.725 -47.4026 140.961 -51.2351 137.694C-56.0173 133.624 -54.1972 125.868 -51.2653 120.321C-47.9188 113.986 -43.6115 107.851 -38.4222 103.239C-34.8497 100.062 -30.8589 97.6084 -26.4724 96.3045C-20.9666 94.6728 -14.8466 94.8574 -8.14996 97.7215C-5.38012 98.9048 -3.07758 100.514 -1.17449 102.451C1.9119 105.575 3.97327 109.539 5.31862 113.896C7.93395 122.356 7.86612 132.286 7.40637 140.373C7.36491 141.161 7.30839 141.952 7.25186 142.736C6.93531 147.066 6.4454 151.381 5.93289 155.696C5.14527 162.362 4.30867 169.018 4.01096 175.699C3.90167 178.194 3.86776 180.692 3.93559 183.195C4.00343 185.64 4.19184 188.067 4.50463 190.456C6.25697 203.786 12.0115 215.962 23.5807 223.819C26.3016 225.673 37.2641 231.1 31.5511 235.249Z"
                fill="#EE772A"
              />
              <path
                d="M120.401 101.045C122.926 105.285 123.095 110.832 120.83 115.215C117.571 115.12 114.763 111.864 115.147 108.627C115.566 105.119 115.954 101.671 116.022 98.1357C118.871 99.4434 117.548 99.7373 120.401 101.045Z"
                fill="#E74041"
              />
              <path
                d="M112.634 93.0294C114.397 96.5907 115.762 101.298 113.828 105.062C112.472 107.708 109.001 109.856 106.073 108.412C104.283 107.531 102.708 110.153 104.494 111.111C108.741 113.391 113.87 111.28 116.221 107.267C119.085 102.379 116.659 96.4098 113.184 92.5998C112.905 92.2908 112.464 92.6827 112.634 93.0294Z"
                fill="#1D1D1B"
              />
              <path
                d="M113.527 93.4591C114.71 97.058 117.488 101.543 121.384 102.583C124.908 103.521 129.076 102.074 130.206 98.3996C130.866 96.2553 127.576 95.3848 126.868 97.4801C126.039 99.9296 122.903 100.171 120.815 99.3907C117.767 98.2526 116.274 95.3358 114.228 93.0521C113.953 92.7393 113.399 93.0634 113.527 93.4591Z"
                fill="#1D1D1B"
              />
              <path
                d="M101.166 56.2943C101.008 58.9435 99.2181 61.6795 96.5877 62.045C92.6835 62.5914 90.1624 58.2652 87.728 55.16C85.0033 51.6741 81.1029 49.1153 76.8219 48.0036C76.6335 51.9831 79.8669 55.16 82.4445 58.1974C85.0259 61.2348 87.1514 65.7984 84.7772 68.9941C82.2976 72.3254 76.8408 71.2778 73.7242 68.5344C70.6115 65.7909 68.7121 61.8641 65.5504 59.1734C62.0608 56.2114 57.5499 55.1223 52.9033 54.8284C64.352 44.8192 79.279 40.3159 93.9045 40.3498C95.9395 42.9011 97.6278 45.8028 99.0598 48.697C100.232 51.09 101.325 53.6413 101.166 56.2943Z"
                fill="#EE772A"
              />
              <path
                d="M119.493 71.7188C118.792 69.518 120.446 66.4731 122.545 65.546C124.557 64.6604 127.007 65.6101 128.153 67.3963C129.705 69.8119 133.391 67.6828 132.015 65.139C129.894 61.2198 124.599 59.5692 120.68 61.8152C116.734 64.0801 116.357 68.5269 118.294 72.2238C118.637 72.8795 119.719 72.4311 119.493 71.7188Z"
                fill="#1D1D1B"
              />
              <path
                d="M82.0677 88.1081C79.4448 84.5581 73.7469 82.7153 69.6769 84.6561C65.9461 86.4311 63.9714 90.8402 65.8368 94.6388C66.956 96.9225 70.4344 94.9139 69.2623 92.6378C68.1996 90.5726 70.2912 88.2211 72.198 87.6445C75.3259 86.6986 78.1145 88.6809 80.9485 89.5702C81.721 89.8076 82.5915 88.8165 82.0677 88.1081Z"
                fill="#1D1D1B"
              />
              <path
                d="M112.69 87.3769C109.544 87.4674 102.745 91.3979 106.024 95.2192C107.441 96.8735 109.762 96.8773 111.526 95.8033C113.572 94.5559 114.899 92.2722 115.607 90.0488C115.969 88.922 115.178 87.8781 114.164 87.5051C110.475 86.1484 106.367 88.9522 106.209 92.8186C106.114 95.125 109.766 95.6601 110.271 93.3688C110.558 92.0574 111.699 91.0625 113.064 91.4959C112.581 90.648 112.103 89.8001 111.62 88.9522C111.364 90.0526 110.953 91.1002 110.23 91.9858C110.007 92.2609 108.805 93.5761 108.436 92.9468C108.232 92.5963 109.936 91.0173 110.218 90.7724C111.066 90.0375 112.121 89.4986 113.139 89.0388C113.96 88.6695 113.531 87.3543 112.69 87.3769Z"
                fill="#1D1D1B"
              />
              <path
                d="M132.901 83.9512C134.766 83.2842 136.443 82.0255 138.139 81.0118C139.982 79.9152 141.84 78.8374 143.709 77.786C147.459 75.6794 151.242 73.6255 155.139 71.8016C158.165 70.3846 155.312 65.3914 152.508 67.302C148.947 69.7289 145.356 72.1031 141.851 74.6091C140.189 75.7962 138.539 77.0059 136.907 78.2344C135.252 79.478 133.255 80.6952 131.936 82.2931C131.367 82.9827 131.876 84.3167 132.901 83.9512Z"
                fill="#EE772A"
              />
              <path
                d="M136.104 89.8264C139.39 88.8805 142.526 87.0791 145.676 85.7526C148.955 84.3696 152.309 83.1976 155.681 82.067C158.734 81.0458 156.944 76.5424 153.944 77.9481C150.76 79.4404 147.621 81.0156 144.459 82.5494C141.365 84.0493 137.879 85.4474 135.147 87.5502C134.107 88.3491 134.631 90.2484 136.104 89.8264Z"
                fill="#EE772A"
              />
              <path
                d="M84.796 102.379C83.1454 102.266 81.4459 102.846 79.8593 103.25C78.0241 103.713 76.2039 104.229 74.4025 104.814C70.9054 105.952 67.5477 107.376 64.1447 108.763C61.4804 109.848 63.1611 113.775 65.6747 112.388C68.8403 110.64 72.2357 109.242 75.6235 107.983C77.2967 107.361 78.9813 106.769 80.6809 106.223C82.2485 105.722 83.967 105.42 85.3915 104.572C86.4353 103.947 85.9304 102.454 84.796 102.379Z"
                fill="#EE772A"
              />
              <path
                d="M87.4829 107.466C85.9491 106.946 84.7658 107.741 83.4242 108.446C81.8528 109.275 80.3454 110.221 78.8191 111.129C75.6649 113.014 72.5408 114.939 69.4205 116.88C67.0313 118.369 69.2698 122.194 71.6251 120.652C74.8057 118.576 77.9712 116.488 81.1141 114.355C82.6894 113.289 84.2797 112.245 85.7833 111.077C86.9176 110.195 87.7618 109.539 87.9351 108.062C87.9728 107.787 87.7203 107.549 87.4829 107.466Z"
                fill="#EE772A"
              />
              <path
                d="M5.31108 113.899C5.23194 113.967 5.1528 114.035 5.07366 114.107C2.16439 116.703 -0.673285 119.394 -3.40544 122.168C-6.19789 125.009 -8.85468 127.982 -11.5228 130.933C-13.1395 132.723 -14.6619 134.653 -16.3276 136.428C-16.0676 134.053 -16.2447 131.551 -18.0196 130.089C-18.909 129.354 -20.0245 129.06 -21.1852 129.041C-20.4239 127.632 -19.6062 126.26 -18.8223 124.919C-16.8062 121.489 -14.4848 118.26 -12.073 115.098C-8.68133 110.659 -5.05604 106.449 -1.1858 102.455C1.90436 105.579 3.96573 109.543 5.31108 113.899Z"
                fill="#F49E5A"
              />
              <path
                d="M7.24429 142.74C6.92773 147.069 6.43783 151.384 5.92531 155.699C4.10513 156.826 2.15682 157.753 0.178368 158.507C-4.21946 160.184 -9.14865 160.855 -13.8253 161.066C-16.0601 161.171 -18.2948 161.028 -20.5144 160.757C-20.8724 160.715 -21.238 160.67 -21.6035 160.629C-20.684 156.555 -19.674 152.5 -18.7282 148.43C-18.487 148.464 -18.2496 148.498 -18.227 148.505C-17.8803 148.543 -17.526 148.577 -17.1793 148.611C-16.0638 148.713 -14.9446 148.777 -13.8253 148.822C-9.98149 148.976 -6.92148 148.762 -3.52984 147.94C-1.95461 147.556 -0.401981 147.126 1.12049 146.568C1.18455 146.546 1.23353 146.531 1.27499 146.516C1.27499 146.516 1.27876 146.516 1.28253 146.512C1.2863 146.512 1.29007 146.508 1.29384 146.508C1.68199 146.331 2.06637 146.15 2.44322 145.954C3.10648 145.607 3.75466 145.23 4.38023 144.816C5.62383 143.991 6.32854 143.546 7.24429 142.74Z"
                fill="#F49E5A"
              />
              <path
                d="M73.6866 155.975C78.6987 166.677 86.5447 176.046 95.3366 183.854C96.8553 185.203 99.0937 182.889 97.5487 181.642C88.3535 174.226 80.8354 165.362 73.9202 155.839C73.8185 155.7 73.615 155.816 73.6866 155.975Z"
                fill="#E28241"
              />
            </g>
          </svg>
        );

      default:
        return null;
    }
  }

  return getIcon();
}

export default Icon;
