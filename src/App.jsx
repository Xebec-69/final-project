import "./App.css";
import React, { useState } from "react";
import { Search, Sliders } from "lucide-react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import Items from "./Items.jsx";
import IconScroll from "./IconScroll.jsx";
import PopupModal from "./PopupModal.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* Header Container */}
      <div className="flex items-center justify-between w-full px-8 py-4 relative">
        {/* Logo on the left */}
        <Logo />

        {/* Centered Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <span className="font-bold text-black">Home</span>
          <span className="mx-2 text-gray-400">|</span>
          <button
            className="text-customOrange font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Let's personalize your trips!
          </button>
        </div>
        <Menu />
      </div>

      {/* Search bar section - remains centered below */}
      <div className="flex justify-center items-center mt-4">
        <div className="shadow w-1/2 rounded-full bg-white px-8 py-6 flex justify-between items-center">
          <div>
            <p>Where</p>
            <p className="text-sm opacity-50">Search Destination </p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Check in</p>
            <p className="text-sm opacity-50">Add dates</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Check out</p>
            <p className="text-sm opacity-50">Add dates</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Who</p>
            <p className="text-sm opacity-50">Add guests</p>
          </div>
          <div className="bg-customOrange p-4 rounded-full">
            <Search width={30} height={30} className="text-white" />
          </div>
        </div>
      </div>
      <div className="p-10">
        <div className="flex space-x-2 ">
          {/* Legacy Button */} <IconScroll />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center w-36  border border-customOrange text-customOrange px-4 py-2 rounded-lg shadow-sm hover:bg-orange-50"
          >
            <img
              src="/images/ph_butterfly-light.png"
              className="h-10 w-10"
              alt="a"
            />
            <span className="font-medium">Legacy</span>
          </button>
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {/* Filters Button */}
          <button className="flex items-center w-36 space-x-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Sliders className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>
      <div className="sm:ml-[130px]  sm:mr-[80px] flex flex-wrap gap-8 p-2 justify-start">
        <Items
          image="https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/4a90da4f-0eb7-4a89-a320-ba28b96ec459.jpeg?im_w=1200"
          title="Luxury Seafront Villa"
          location="Vis, Croatia"
          rating="4"
          price="710"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://s3-alpha-sig.figma.com/img/8cd2/4fdc/4f51f8d45316fdad0fa8d9c5c91cf23d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l6Ufj3sYmv7DiWlqMcvqGGajDNlwvQVN2fIkn6SRKaq4gA3AVvGk3iuuGJohBdu10jgwURjMMlTxnaucl4u1G6iAHan0BL~eCRvb63FVsaqutXhwNFy6spNSO5c6VxFfbr0jX9jRjtUayBl-dA8VaOsTsBR1e-EHBmJjR-0LmN1AqDIsjlMG4veBVvFL2-kCEOPMmH~hOl6qOf7mazlqYEM~t9aE1VB90hMcm4101ol~h-pEvR-D4IiOrHYrwQsnpS7CFcMA2oohjQ5Md3PZJcogWaxJN2Y9ZJuuSvOY5f8tnjBb3jjGWx8SWfNJSRT3jcXF696ZB6ey~lklHyGYHg__"
          title="Lake Lohja"
          location=" Finland"
          rating="5"
          price="262"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/miso/Hosting-1275109301584784801/original/4f28c6e4-9505-4890-87a6-32b983414045.jpeg?im_w=1200"
          title=" Wild Hunter's Mountain Cabin"
          location="South Africa"
          rating="4.8"
          price="82"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/miso/Hosting-2842199/original/06dfa908-a5d4-4ff9-8186-10e8fadab571.jpeg?im_w=1200"
          title="Villa Perla"
          location="Luka, Croatia"
          rating="4.8"
          price="209"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/4a90da4f-0eb7-4a89-a320-ba28b96ec459.jpeg?im_w=1200"
          title="Luxury Seafront Villa"
          location="Vis, Croatia"
          rating="4"
          price="710"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://s3-alpha-sig.figma.com/img/8cd2/4fdc/4f51f8d45316fdad0fa8d9c5c91cf23d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l6Ufj3sYmv7DiWlqMcvqGGajDNlwvQVN2fIkn6SRKaq4gA3AVvGk3iuuGJohBdu10jgwURjMMlTxnaucl4u1G6iAHan0BL~eCRvb63FVsaqutXhwNFy6spNSO5c6VxFfbr0jX9jRjtUayBl-dA8VaOsTsBR1e-EHBmJjR-0LmN1AqDIsjlMG4veBVvFL2-kCEOPMmH~hOl6qOf7mazlqYEM~t9aE1VB90hMcm4101ol~h-pEvR-D4IiOrHYrwQsnpS7CFcMA2oohjQ5Md3PZJcogWaxJN2Y9ZJuuSvOY5f8tnjBb3jjGWx8SWfNJSRT3jcXF696ZB6ey~lklHyGYHg__"
          title="Lake Lohja"
          location=" Finland"
          rating="5"
          price="262"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/miso/Hosting-1275109301584784801/original/4f28c6e4-9505-4890-87a6-32b983414045.jpeg?im_w=1200"
          title=" Wild Hunter's Mountain Cabin"
          location="South Africa"
          rating="4.8"
          price="82"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/miso/Hosting-2842199/original/06dfa908-a5d4-4ff9-8186-10e8fadab571.jpeg?im_w=1200"
          title="Villa Perla"
          location="Luka, Croatia"
          rating="4.8"
          price="209"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/4a90da4f-0eb7-4a89-a320-ba28b96ec459.jpeg?im_w=1200"
          title="Luxury Seafront Villa"
          location="Vis, Croatia"
          rating="4"
          price="710"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://s3-alpha-sig.figma.com/img/8cd2/4fdc/4f51f8d45316fdad0fa8d9c5c91cf23d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l6Ufj3sYmv7DiWlqMcvqGGajDNlwvQVN2fIkn6SRKaq4gA3AVvGk3iuuGJohBdu10jgwURjMMlTxnaucl4u1G6iAHan0BL~eCRvb63FVsaqutXhwNFy6spNSO5c6VxFfbr0jX9jRjtUayBl-dA8VaOsTsBR1e-EHBmJjR-0LmN1AqDIsjlMG4veBVvFL2-kCEOPMmH~hOl6qOf7mazlqYEM~t9aE1VB90hMcm4101ol~h-pEvR-D4IiOrHYrwQsnpS7CFcMA2oohjQ5Md3PZJcogWaxJN2Y9ZJuuSvOY5f8tnjBb3jjGWx8SWfNJSRT3jcXF696ZB6ey~lklHyGYHg__"
          title="Lake Lohja"
          location=" Finland"
          rating="5"
          price="262"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/miso/Hosting-1275109301584784801/original/4f28c6e4-9505-4890-87a6-32b983414045.jpeg?im_w=1200"
          title=" Wild Hunter's Mountain Cabin"
          location="South Africa"
          rating="4.8"
          price="82"
          description="Private cabin with stunning views"
        />
        <Items
          image="https://a0.muscache.com/im/pictures/miso/Hosting-2842199/original/06dfa908-a5d4-4ff9-8186-10e8fadab571.jpeg?im_w=1200"
          title="Villa Perla"
          location="Luka, Croatia"
          rating="4.8"
          price="209"
          description="Private cabin with stunning views"
        />
      </div>
    </>
  );
}

export default App;
