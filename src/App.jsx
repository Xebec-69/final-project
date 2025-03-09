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
          <span className="text-orange-500 font-semibold">
            Let's personalize your trips!
          </span>
        </div>
        <Menu />
      </div>

      {/* Search bar section - remains centered below */}
      <div className="flex justify-center items-center mt-4">
        <div className="shadow w-1/2 rounded-full bg-white px-8 py-6 flex justify-between items-center">
          <div>
            <p>title</p>
            <p>description</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>title</p>
            <p>description</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>title</p>
            <p>description</p>
          </div>
          <div className="bg-orange-300 p-4 rounded-full">
            <Search width={30} height={30} className="text-white" />
          </div>
        </div>
      </div>
      <div className="p-10">
        <div className="flex space-x-2 gap-6">
          {/* Legacy Button */} <IconScroll />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center w-[140px] space-x-4 border border-orange-400 text-orange-500 px-2 py-2 rounded-lg shadow-sm hover:bg-orange-50"
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
          <button className="flex items-center w-[140px] space-x-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Sliders className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>
      <div className="ml-10 mr-5 flex flex-wrap gap-8 p-2 justify-start">
        <Items
          image="https://s3-alpha-sig.figma.com/img/3325/ae4a/b136650155d2d3a04ed88f6caa0eea7c?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YxiBQGPPKq6j0h0vPCOKQSPzxuhwdJFX89mP8VqNbcCfqg7mtxVa20R6fJ4nBwGS5x2Iu4J~kcS1y-CfYEro3YAnQcqiAdCLrPnkmUdPfy8LFEOEWSgL5DXmyf3hIcvo83I~PDMDFBB0Q2WZaTR8YjMH3dNvsejSDRw4Um4Btl32yojThJMI~Nd1oFp9h7KYNyl422dIQoU2MdDFvD-jXXOc7CVYTFYScaJedhxohUEFH4Bt~YiOqfAUffkl3M15dJRIUtxlKdc7NS3TrBWj43676-NzfV7Zxd-pBlULHrxdrYVkITuXOFVi9mH5~l~oy3XC2Fj8~csBo0Etr-4GXw__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
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
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
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
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
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
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
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
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
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
          image="https://s3-alpha-sig.figma.com/img/8853/92d4/cd9734c119d176944d6b244c8359b537?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aP~vmstzXUFrSxpM3rOvFHpgFZAgSkZEcPWpYAghd95-X4gewcAZltvfwFUXcsaZJXyX0CHfBz9Newkssl6uO-oyDng8Pf0k0SOeDfH56ms3P9KXu1qZ1jzHoqvrT0gj4zIXgrtCQQgruLoiwuz~rtOVAMnse9vIOR6xwlVafxXcrePdamy75lD3qNWaVEWEFhOBCFLnV816JsQpLuFC7wmpr814yKsy-YY4YA1SRDRezjaJielw4~04M3wE~jq7yRa-crfTf7sb1-Eac4HGYnbxnSFWslXUTvK5kpA2w-xlaDtFsu7ZN4KO8u0E7U5rv54ZpHbjQa81lgRpEC1k5g__"
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
          description="Private cabin with stunning views"
        />
      </div>
    </>
  );
}

export default App;
