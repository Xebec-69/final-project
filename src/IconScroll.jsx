import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IconScroll = () => {
  const scrollContainer = useRef(null);
  const [itemWidth, setItemWidth] = useState(78);
  const icons = [
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/8ccd/3ac9/b120b5c5f7b2c3f62b3184779139fe7f?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dUHrxd4Kgn7x7sn0wQd784FqZPeSVb1s3l5I3SsErzYNLf63GhULm9a96YJKTt90hZW~pzbUrIXeJjRScZv6y0kDumiHofDkoC5X8NCVTfWn2OZ0VpsrjC2uSlgocVN1Oo7NLaq1g2FJRrLsuApjfaTn4M4CuXFll-yXhxGRWltbM~yHu7eOpSBLUyM2JSwlio8ibuIR5z5frfOXbuunB6yGLndCteKayh07-Em0qgvzozNiIN2QVjcfwhqS0vO6TGnlN03Fh8qNll1z1kdaRwbgh0xLqNWN7nYT2I50MZl2ascCWk-UFek1RBdH0K-EbKZwb-~cDzksMPUkuSM40g__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/91c2/5cb2/4e9a95af6e518904f167cc4114a8932b?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RvJe8Vd3EvlarbC2bwV1fOPoscxAdd1j7SLmkpsz9E5laodi80wm~p0zuVBBFnSJfjLKj86KI3vm-66r73XugbSmKqjrQVO1n8byEKq5SyHUYQN6lUYcagdybN-~OyfQzOR647cjlgLO0KRtof8u3u59lJuyrA7vV7GjO~zGzD96ZspWKDVDU~fCAK33AVkCAWL9klf~5BEyaKqt2~sBVyRtKnfXLbQP9UX7PV-mX8P8bUuFI8v79b8w2F6rG3pj2d54-P5RG35tH1ZBXmSo9cOgqpPF3eoap2Q6~oWQjvDUihc2KdHLpMCnEAhcak1X~otzI7QBanOxaveAbkbveA__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/0fa9/f56a/0883a1ecb4a66077b2729a0352f36a92?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JqRuGrDPG7KED9DJbYu2bdxqXTJVQFVZY4od4Ar0W3ceXK9ZeFe6yIOU71BvssNGz0VFu6XtifU8CAI7RLjfrEPGZ59QmIXmXXISYlG6~GxZKmvJXjmtALs3CSfFv-6~8QTVni-rqiHoUBQgmd3fk7kOEuKFcocImeP8Oe9ZZrstB5ygmrbXRwi9csjZsWuu48YPfEIN2O6IvddU6zwpexTIlLCzAhP2OU5CT7X8goYZnxt0P6WXZTAlunmslEawNc8m6gmG7wrVyLkD9yXjY3jnfWdVlKb0CwCeiHOM2euBUdW63mr0t401It~9-338Pqbvi0aKjS4vZSMWNNDfGA__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/0779/c993/550ea73e2af3dd0164b6b54a36cc77bb?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HKfmcyrTsx97tuljBKBm8Mx454goob3P3uhr3Jh98RSucgxGIBj7reV9WY1Yvy1YOL6fPsBaL1vDdagW4Q9sjuhWRIX2YSQht6im4cCL8z8EhnQC8DVDDWh5UARAVhdmLEkGaROgzq5HAxpxrly3RbkNbEQem2eINSt71HEPGK5zzcE6m8TiUFE~YjyDSnhEZ2zzpkz28yCbyKorZlIQNtDuoo2PivCMO2DwQOXNVBOhQChqOWBizrfBnsTHfOTRmw6DBvwkPwv8TxbLzkYUg8eDxRWZvMU6NoQL~7TFKmmUMQytDythR4JrZQ38c3zJGM4hYEep7H2-NKlWwbtT~A__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/d335/a14b/98f15737ad91b42faf56a113751f97f7?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dR5fz2egGFPJQmeqg2C9WLb881Q9~5Jkimf9avkYAKt0DJYFNd0w~-GGWn4rkT1SpSDTYY7dkiZ1xjoVnB8qwV47x3TtUPkGITKdPM-hWI6wYvNr0wG4yt~6ZZeSPSusDaek-fjmnGcKeBtWxBMfKINlwgsG5SyuI9YD3TfHmMoZTZyNIJyvjHlWVtPd~tUfOqaotvvztR2GrerKIeeSwwmv7UiFmOvgE6NzKKvn1z7tPlZ8pJg9cN-mMby9M-a8ebFx~j853IQdDR2M8-udEBs9uNmXJR5WikUC3B0yIkL4uccOop4bT0QlMN-RN1wKlRzs7v4OeOF5MD42EobVkA__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/92c2/f6ae/6028bc0edd2598f4929d345911da2016?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Et2wLwWVjxZv~0CFwjzio7hrZHLOuAIFcORSGF4V6lHtyT6vTtWcBEymUdnSuPfQSxmFF3KmbQD21SVQEMkTxfwmIZnoaseHGCkAGuHNLBuQ2CQNmyZXhINJ7VdK4e3E6mMuyMmkj0stHjgqQ1pgLYxJMP2OjQFqgB1sj6PxKlcnInOTUqPxTNz2Ugm3rVNuqqSORhwVw6VeU4oJj0vzusSkGKymWE4kJ7u0i1jc45y3GIFjk~kYb5NyKWOQVQnQEr~1uovxcOT8efYqx0QuGyr17bX8HNUY48T6AB~mJz1d3WGjUOSo-kLO1R6acH1VEG9GPfhsaS1oX-FaXVCrIA__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/5b28/6039/ef958cca9f15436e2105a5688ed9bfcc?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KHDvhmxj8Gyrug0IkP59W66Z3lJqKQ~lOsMDsuURtiBhe2pd83uiDb1K3Gfoc~jkJUujcdOFWtqeHHhVRr9K1h0O4RUV6RTB9MnjINDW5cXN1wyVX1DK0BBZfaNoXgkGAaJx97DkgUbxucZYHxwN~A97aXGdZh-uhpPv-IlpIDaTAveTfQPpeydCtG6h-Buv~uEE7jOmfxjD-xJbHMVrEVrosl9V-tLPTlLWPkA9G2D6NnUffH7Og-XoZPyTClnPflkTyHYyepakbfe6J70Lqi2WwEr87BohtvV3~kO4KQ4NpJgGintoiFdeUtNglyD-dr62bmkp07H7EX8-EAFRPw__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/f42a/cc0c/ba2d39ee4e95dfe47756f0ae445aa31f?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MCBDyJJQsKxdO962fcba8yAF9dmYSapqz0VryXVVSuTm2bFggKuoRhG3ZLVQRWC4lze6VQXjqmD6Yh0b2VpyrKWKhe3lr7~9ssnPr5--VtM0zmTzo9zymdFgGCh3V4XFvkM98Wtqe6-iY6ZNakomjLFL3tsKPvOyhGAAN~iXpEJfLklQ5euFNmpZ2~E~B63OmbBtXp-a5WatbEJ4IEWf-yjJsqjrDjazxmCqc2eQmUyqO1A40OU40LntLKbmf9khRuHkCSJJ6abEifcYnPXBVQdIIFnSd~jag26KNT0GQZk9NDa9~Dk3Xqd7-9C3SlrUSlog6DzRj0bULvMshNfT2w__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/73fd/26a0/632ccb645360a7dec6d2f9695bbe5056?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fEJ3d6Kb2-BQza2tuCbD7XbY7v~q1M-chqpqFJa~1F~Mrhame7mPMTdRv2O6H3ReoXMhmcYjQJ09bmfinNptkPYGzw8bxqL5S8YxsPm-MmyPK-EA-fiKTJooK-o8f8RUo~m0xJXzSaz5tgZK3OiGX-xE-SceXvIA6oy-7vj7oaoT59HK9WKaRMaWr03cscy6Zy9XF~A8XFk8bdVIA02aTmECPMCd4-einFOzW6Y7lvf4QkJKiehtUmAzlXbWqUQM2P6ytNUTzmnScKB2azosSCNCILUPKN4tvn5QSVt9p11apJ5mNmtJwxgQ1wLq0ooAI3u-L9mv746UUS4Dn~I1Qg__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/a6d7/e978/4ef4d46a699075a47901bf746d04bf9d?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oIIUlWWugIS-M0pTkPDMeFG--uVNywThOCZyqPcls74uhjjsWUV-5zW8wZUhJkVjMb6cgu7FTRJXR9HoWLGgMt82JE0IDTFQWKA4wInZ36DeeIVyplmWpU7WCAbkoO8BS~3ulOysWanfsqvxEHd8~gAFjwF-V13gmW3eOWhQIMdLM0CMNUkQzqykhpNvB0ukvYfK9zalaUzVRDVjRZ1emWDVg7Nym6Ohw3AOhsX8~7mS8xCcau9gRmX67dr9J8monDy9DAQgE175oLc3xdcXJuKdBk9ZCf~f-amrxR8hSXzpEfo48N01InRjGoq35~4j6~5nCtTP1VYuYnu6txKPSw__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/ffa9/83bc/0a7c60aefd8898368597633bdeeb7975?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Yp~mlI1SHntJ-sk9MTaPpQSP08xZ97NLhYohhksviWaoRFinBbf2jIjw4cTJkEfBdFxB9EUejw3Do9hDt8TEIi-FKLl0spOtc8V6uBfE5WL17DIkptPIRDdR7WzKeQdcVMCC9~73-RfYxZehx6nqESWit9vWk9S2VbIQRaqcQtcGnazXm9kij8B5aR0ny8KQZk2ABKyxrjKn4pjVXE3rPhZBlUgxlnTY~OTR~n6iw5UapbqEcZDkV3nKH0J~u6lB57-UQZ-niGNU8gopDwefVK2oK~DUTjstePHKcfPeJSjPgcH~-f2na4XKJadzZS5qxpmxHmU-s56e8Il6m~Kxqw__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/4577/e5b1/87fda98735c47245bf9f88b2337b78b5?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VzkOi5PeaGXJouBvP4~NfemsciU645MPq8F4AZNklgPyZc-Glw82vmCJ3DB3WB0U1mfNNKgKgS287SWvBpbMFljW~BEZPO7EGMKXYoqk4gUl7L0jzJVfcIIiqos1HwFwbg6bZ4XbpbS-eJOZF0go~V23l5VLpZLCyQTldth894d111-5WM-JKUf~n-LbqorleJUqHr0TIy7V4n-OKj294pX49qFXWK2sgWRGxoCmArbwcMDMTVpQeFRRUZKMYu~PItfe~Ea0T8o1EK1pi0CwhwkZR5Zm1P18EaLrLBQ01E9UI4~4YAoGzH6mkCwoIJ4tjiNnb1ocltYC0Ucm8I-MGA__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/90ba/b5be/31f804e5f90080f40bfadf17f850fc52?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bqGYn4Pg3kauQ8hg3EQh7vPLIQ3xeT3N3CV7eoLU51nHNqBArdaMM-sdDJdyzqoc8pRCuxsEptrB1eiO5ENmfMcRsMl3-uaJsb60EE~GCR-7nrVCsJ6IWSMv~9Gmu0lKg00qsUrhdTV7EQV8iZa8jNVSRDi6xAvYtQ-wnD8mXX2xoZehRuMxsvq7tAL82MMqisRwT11aBipNJzdfML4iB9kDV9vU6CXm6iGIHlMz8A1Gd8TzZBANIIdM8K4Fi1VS6LMskhVZqaesUxEENg2mo5V8F0R921mQBqS5vZG~SR3CJmV8X6iu5sOLRqcoMJ8tdMZ3WAPmTTPpaLXHaxGt0w__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/bdfd/0b2c/355d9ffac3c209aff67166a05391ce33?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mh4JI14djdezKv3aqKMQvhskS3tY2o2MQhxegilMYng0gUTCOdYSLkrQV04EH96K6bHBWRQQQPjsb5CMsiWftn89IG3JvbGa2cfPwNOEyNaO-fxuDEk2ptuRzawED-zg36Ezb9jP9uC~RJNCQFRE7URLy~1jcFx4EjVtofntycnFKtQqiunR0GFM0TkI7~wpkI-lynfPbVWMaNLSlzjmakdkElifUzIJJNAl8BAxl6-9l7UtbsSzaA6nbvXYDfKZw2UlGLFbxsnO334W8-zIv17jKp0ooutKFjr9TGPdScOxI~6myjpVhvSbqJAEKzJQQoJbqXxH7tfMOVsOw4aW-w__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/2ade/050b/c367ea02651aa9863a7363a8e8ad6ffe?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SZbInucMBhFMMscJJSj5tOGOv5kq5ojvK8slU70oXLtYaVUSIfcF8DM9b9Een633cXxV3JIihc3CaVoZBOkBpT2i3NXsgE6ijgaItOQI-crGLBmXBR1MFHkhsOUkZKKvTZwmvlptrpTV~vzoBaOY~cZMzc8XP9oy49ke6n1EZr-siki9z-vz8C6xL1VaaVoqDoaYJbeKA0MeM0c7fM1ijKcifXdydZljqThngBzRCEEnzvQLeKU9QOLf4~7047013N0cT3VAXwPDom2HwLcElQYrhwtgl63TGIrDZvt3-al7-dGRzfR22n3ua5XWgo8ClbaTOorqScjMEiGhTtDxKQ__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/2ade/050b/c367ea02651aa9863a7363a8e8ad6ffe?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SZbInucMBhFMMscJJSj5tOGOv5kq5ojvK8slU70oXLtYaVUSIfcF8DM9b9Een633cXxV3JIihc3CaVoZBOkBpT2i3NXsgE6ijgaItOQI-crGLBmXBR1MFHkhsOUkZKKvTZwmvlptrpTV~vzoBaOY~cZMzc8XP9oy49ke6n1EZr-siki9z-vz8C6xL1VaaVoqDoaYJbeKA0MeM0c7fM1ijKcifXdydZljqThngBzRCEEnzvQLeKU9QOLf4~7047013N0cT3VAXwPDom2HwLcElQYrhwtgl63TGIrDZvt3-al7-dGRzfR22n3ua5XWgo8ClbaTOorqScjMEiGhTtDxKQ__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/2ade/050b/c367ea02651aa9863a7363a8e8ad6ffe?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SZbInucMBhFMMscJJSj5tOGOv5kq5ojvK8slU70oXLtYaVUSIfcF8DM9b9Een633cXxV3JIihc3CaVoZBOkBpT2i3NXsgE6ijgaItOQI-crGLBmXBR1MFHkhsOUkZKKvTZwmvlptrpTV~vzoBaOY~cZMzc8XP9oy49ke6n1EZr-siki9z-vz8C6xL1VaaVoqDoaYJbeKA0MeM0c7fM1ijKcifXdydZljqThngBzRCEEnzvQLeKU9QOLf4~7047013N0cT3VAXwPDom2HwLcElQYrhwtgl63TGIrDZvt3-al7-dGRzfR22n3ua5XWgo8ClbaTOorqScjMEiGhTtDxKQ__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
    {
      icon: (
        <img
          src="https://s3-alpha-sig.figma.com/img/2ade/050b/c367ea02651aa9863a7363a8e8ad6ffe?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SZbInucMBhFMMscJJSj5tOGOv5kq5ojvK8slU70oXLtYaVUSIfcF8DM9b9Een633cXxV3JIihc3CaVoZBOkBpT2i3NXsgE6ijgaItOQI-crGLBmXBR1MFHkhsOUkZKKvTZwmvlptrpTV~vzoBaOY~cZMzc8XP9oy49ke6n1EZr-siki9z-vz8C6xL1VaaVoqDoaYJbeKA0MeM0c7fM1ijKcifXdydZljqThngBzRCEEnzvQLeKU9QOLf4~7047013N0cT3VAXwPDom2HwLcElQYrhwtgl63TGIrDZvt3-al7-dGRzfR22n3ua5XWgo8ClbaTOorqScjMEiGhTtDxKQ__"
          alt="Tickets"
          className="h-6 w-6"
        />
      ),
      label: "Tickets",
    },
  ];

  useEffect(() => {
    const calculateItemWidth = () => {
      if (scrollContainer.current?.children?.[0]) {
        const firstItem = scrollContainer.current.children[0];
        const width = firstItem.offsetWidth;
        const style = window.getComputedStyle(firstItem);
        const spacing = parseInt(style.marginRight, 10) || 0;
        setItemWidth(width + spacing);
      }
    };

    calculateItemWidth();
    window.addEventListener("resize", calculateItemWidth);
    return () => window.removeEventListener("resize", calculateItemWidth);
  }, []);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[75vw] p-4 relative ">
      {/* Scroll buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 z-10 ml-2"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 z-10 mr-2"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollContainer}
        className="flex overflow-x-hidden space-x-2 pl-10 pr-10"
      >
        {icons.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[70px] flex-shrink-0"
          >
            <img
              src={item.icon.props.src}
              alt={item.label}
              className="h-6 w-6"
              onLoad={() => {
                if (scrollContainer.current?.children?.[0]) {
                  const firstItem = scrollContainer.current.children[0];
                  const width = firstItem.offsetWidth;
                  const style = window.getComputedStyle(firstItem);
                  const spacing = parseInt(style.marginRight, 10) || 0;
                  setItemWidth(width + spacing);
                }
              }}
            />
            <span className="text-xs mt-1 text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconScroll;
