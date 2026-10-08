import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Phone, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.productNumber || product._id);
  const cartItem = cart.find(
    item => item.productNumber === product.productNumber || item._id === product._id
  );
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isFavorited ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
      'info'
    );
  };

  // Image fallback handler
 // Product image
const productImages = {
  1: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/jeBEV96DcbGEuQzPINWw/image.webp?v=1790585881380",
  2: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/gz3Cq2255ts11QXUW0CM/image.webp?v=1790586008035",
  3: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/HhAuRFKkMnnRDu9j7gQf/image.webp?v=1790586226387",
  4: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/ecirfvYCFBpmUtkzWUxi/image.webp?v=1790998438023",
  5: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/IgiKbqWFBkcBG5vUeGFR/image.webp?v=1790997955429",
  6: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/mAlgTq2spNkK4yW1LHmN/image.webp?v=1790998097121",
  7: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/CrWmmFfMlYyjE0SRBjWT/image.webp?v=1790998048446",
  8: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/ySHTYgXCOHmUN8DkmSzp/image.webp?v=1790998271873",
  9: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/6Cw1nqwLBeuPbGqYCeNw/image.webp?v=1790994397943",
  10: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/REprsIOF1llTBlXYZcxs/image.webp?v=1790995052321",
  11: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/DvSdDQqEOxUBJFUs84q5/image.webp?v=1790994710345",
  12: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/gukfSxuQF0n6s1HWj5Vv/image.webp?v=1790994030845",
  13: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/WdGGTxD1IcGi4BNbgoSB/image.webp?v=1790947091660",
  14: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/QGFSg7eUcvuGmy5DdRKF/image.webp?v=1790947163561",
  15: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/wuabfLokVPCnbgl3fPtz/image.webp?v=1790947229337",
  16: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/ebII5Hr5SnC5FMFfFSOw/image.webp?v=1790947619249",
  17: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/yulIbkDTHFQTpniPlahD/image.webp?v=1790992384965",
  18: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/rjcVoW9nG5BsC08HS4U2/image.webp?v=1790993869405",
19: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/zO48h3Ummu2s9Jc0WZHp/image.webp?v=1790994148836",
20: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/diVmH43ivdAqC6zAusVe/image.webp?v=1790994633685",
21: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/AyBNfQs0UhLyrO84BjTk/image.webp?v=1790993907172",
22: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/TQ77dqe7yhTLnQjANTuj/image.webp?v=1790587453449",
23: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/cnSfyyOiRRSxJasTfl6F/image.webp?v=1790587499511",
24: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/DN8ua1teKUBKJyCuSQ7Z/image.webp?v=1790587789833",
25: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/BwtsLsPjAGoRvRnvKoTF/image.webp?v=1790994281438",
26: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/nPrfiCIeBHtsI9TblvJl/image.webp?v=1790995018807",
27: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/XBdOeK85WdzqFBdiuErC/image.webp?v=1790994356998",
28: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
29: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/yCzWnEYzKiFRjRBu0EV4/image.webp?v=1791000050107",
30: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/0EgfSKPjIwdTi1Pgfi1d/image.webp?v=1791000136433",
31: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/66FPUD9Ok3aZ7uGUNWzi/image.webp?v=1790997999787",
32: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/UdMbS9QSSKsQjqYy2Ptu/image.webp?v=1790589192352",
33: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/ZUlGxqdMn9ZLFw3gWcZF/image.webp?v=1790589160570",
34: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/zLGhBeb8lhJMCB1EatzI/image.webp?v=1790592344954",
35: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/8yL1Giq8qZ6kNPapoYFk/image.webp?v=1790588734088",
36: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/Ya4XYEPIinJlHzp0QhRv/image.webp?v=1790570121212",
37: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/RLp6293x3hscCLtgmyJZ/image.webp?v=1790587952551",
38: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
39: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/oBX4PUGlL5saV2iyPrTh/image.webp?v=1790588046585",
40: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/QXeSCVpE2YU7Gm7Xu4Lj/image.webp?v=1790588240434",
41: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/vewYMsKc6kyRYpvX9LwK/image.webp?v=1790589113902",
42: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/JUMJ0J43FexweFg6qeQH/image.webp?v=1790586704710",
43: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/SQSs2rLsrDuT3mBtrI0v/image.webp?v=1790992457009",
44: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/kVPPLgvAkfBp4AcZfN9f/image.webp?v=1790588612289",
45: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/t8vsUb2PeQyeLa6e0aL7/image.webp?v=1790588596122",
46: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/LlMTBn0GdkynHwKbIeRM/image.webp?v=1791000861707",
47: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/cPDw6dBAQLE1EBEFCVZJ/image.webp?v=1790994464861",
48: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/1Pjn4J1dNckPuHRKSAWn/image.webp?v=1790592289737",
49: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/QLI2FMGgvT0K2x5VZhl7/image.webp?v=1790999986041",
50: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/mmd13p1bMjSFsehr6PyL/image.webp?v=1790999930228",
51: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/W4IjKOR2t9GIB8JHtIjc/image.webp?v=1790999842399",
52: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/BFvUSqpPRUgTzBQhqSWy/image.webp?v=1790592488224",
53: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/BRtzmyEtQKoQrrMOvaE9/image.webp?v=1790592427433",
54: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/oYzBMXjZqaJ6pEmezWUU/image.webp?v=1790587009420",
55: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/LkNXUdrMOvC5RxqNJedf/image.webp?v=1790586821778",
56: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/p949Ya2XRQUQi39PhN4g/image.webp?v=1790586875858",
57: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
58: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/KWPgcJiPw3LRLuV0woax/image.webp?v=1790998738051",
59: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/KWPgcJiPw3LRLuV0woax/image.webp?v=1790998738051",
60: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
61: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
62: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/KWPgcJiPw3LRLuV0woax/image.webp?v=1790998738051",
63: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/XaMfdSH8SAOoqye28YGW/image.webp?v=1790570597986",
64: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/QD8nWzgbeJRiRtpfZGms/image.webp?v=1790998584295",
65: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/i28ChrGYCTtuJnPLQ2pz/image.webp?v=1790586921950",
66: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/7S8sxsrde4fbUPxf7upd/image.webp?v=1790998818392",
67: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/SY0m82WSFzvRTNQuIUp6/image.webp?v=1790998870880",
68: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/k9kpzIxQJWDQKhvUqeZR/image.webp?v=1790588887461",
69: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/JIsxYQG0CNTJwo46oKzY/image.webp?v=1790589226820",
70: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/nJT1TFE2UrMmBhitlsjQ/image.webp?v=1790586745707",
71: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/rtJQfoIXE6BSKKEYoSXV/image.webp?v=1790588959327",
72: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/VVKmiUovsRO3r0vbMtOl/image.webp?v=1790586521034",
73: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/0T90OmR3jDqigJCtDHP0/image.webp?v=1791000511455",
74: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/H6Nu7SYGvHMYyvoSaau3/image.webp?v=1791000495953",
75: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/SGWbGa786LASA6Q9ckzp/image.webp?v=1790589313192",
76: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/WpC6d2GaABh3PlFzDIgM/image.webp?v=1790946740205",
77: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/9Okh1Ky6iFkPLih1BEeB/image.webp?v=1790946922004",
78: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/ZpMhiruAtdXxTFQ1ln0m/image.webp?v=1791000197078",
79: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/GHtamrAlIv9d5NcIjEE6/image.webp?v=1791000277174",
80: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/b9DcCBA42Kbxm3ggmwpD/image.webp?v=1790947039711",
81: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/SXx4enubuoPEydAbc4Vb/image.webp?v=1790999734485",
82: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/KeqqRjhO5GgTViMQw8cB/image.webp?v=1790947397369",
83: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/QFyvuUDGPDOPxJvinXVX/image.webp?v=1790947380746",
84: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
85: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/TrfXSTMCnOB0ptlpTiB3/image.webp?v=1790592541092",
86: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/S9aeIfUMO3X13FQAQCc0/image.webp?v=1790999579052",
87: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/fnZ6y8AjazNtoa1yrexJ/image.webp?v=1790999716510",
88: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/1oi5je35MYRbxCMzf6h6/image.webp?v=1790947476564",
89: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/2WTHwKeJViFRUkBb2b1L/image.webp?v=1790999478746",
90: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/Vk912eXRZY8QxWZTsisS/image.webp?v=1790587358146",
91: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/N2hqwDP6sjHKxs6mL0PH/image.webp?v=1790592642358",
92: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
93: "https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
94: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/wRB3jFGmzMePcv2Hafw3/image.webp?v=1790997548862",
95: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/wRB3jFGmzMePcv2Hafw3/image.webp?v=1790997548862",
96: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/x3hXKABxDhmogFVi7w3p/image.webp?v=1790997792143",
97: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/gCdAPuFRJWg0Qw2Xk69q/image.webp?v=1790997843784",
98: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/vXICgNFjALyI3E3LTAVF/image.webp?v=1790946592393",
99: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/9Bo4BlRv0wdPk6VKEH8D/image.webp?v=1790591901684",
100: "https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/trhjejIP2HQKp8BFBOQK/image.webp?v=1790946471835",
101:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/6E5TI4MbYubB0v7RHMvi/image.webp?v=1791000614687",
102:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/iE88Zgou36BOXM8btd3H/image.webp?v=1790589448169",
103:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/QrJpDlqmRkZXnNypgCsi/image.webp?v=1790993125867",
104:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/hoevSqpUJdkMY6GEoINo/image.webp?v=1790993022715",
105:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/WKXKRX8A9wBnQ8JNoMDv/image.webp?v=1790993774089",
106:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/nER3fD0hmcodOtDapCrJ/image.webp?v=1790588661942",
107:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/uWJGcNt3SkR7hLMmJsuD/image.webp?v=1790589367267",
108:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/y4KCApBlDFxq6WD6MePk/image.webp?v=1790993343136",
109:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/kbZ9LEuojeq7Dvxy2kCA/image.webp?v=1790587229873",
110:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/okU7fXl8YCazTpDfJ5Ky/image.webp?v=1790992710906",
111:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/aBRpRN6r6y8v66C6kDNP/image.webp?v=1790993616918",
112:"https://pub-5c8629e7efa94f00845e3bc450f87d0d.r2.dev/products/bSwH17lSsSkyfDQPtsvV/image.webp?v=1790993476711",
113:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
114:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
115:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
116:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
117:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
118:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
119:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
120:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
121:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
122:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg",
123:"https://www.sriaaryacrackers.com/images/product-placeholder.jpg"
};

const imageUrl =
  productImages[product.productNumber] ||
  (product.images && product.images[0]);

  return (
    <div className="group relative bg-[#180a26] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media / Thumbnail Section */}
      <div className="relative aspect-square overflow-hidden bg-[#10051a]">
        <Link to={`/product/${product._id || product.productNumber}`}>
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        </Link>

        {/* Product Number Badge */}
        <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-bold px-2 py-0.5 rounded-md">
          #{product.productNumber}
        </div>

        {/* 50% Special Offer Badge */}
        {!product.isCall && !product.isNetNet && product.originalPrice && (
          <div className="absolute top-2.5 right-11 bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            50% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
            isFavorited
              ? 'bg-red-600 text-white'
              : 'bg-black/60 text-stone-300 hover:text-red-400 hover:bg-black/80'
          }`}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Pack Quantity Badge bottom overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[11px] text-stone-300 pointer-events-none">
          <span className="bg-black/75 backdrop-blur-md px-2 py-0.5 rounded border border-stone-800 text-stone-300">
            {product.packQuantity || product.packType || '1 Box'}
          </span>
          {product.isCombo && (
            <span className="bg-amber-500 text-black font-extrabold px-1.5 py-0.5 rounded">
              COMBO
            </span>
          )}
        </div>
      </div>

      {/* Product Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Category */}
          <div className="text-[11px] font-semibold text-amber-400/80 uppercase tracking-wider mb-1 line-clamp-1">
            {product.category}
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product._id || product.productNumber}`}
            className="text-sm sm:text-base font-bold text-stone-100 hover:text-amber-300 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
        </div>

        {/* Price Section */}
        <div className="pt-2 border-t border-stone-800/80">
          {product.isCall ? (
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-black text-amber-400">
                CALL FOR PRICE
              </span>
              <a
                href="tel:7094183836"
                className="p-1.5 text-xs bg-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/30 flex items-center gap-1 font-semibold"
                title="Call 7094183836"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
            </div>
          ) : product.isNetNet ? (
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-black text-amber-400">
                NET NET RATE
              </span>
              <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                Special Rate
              </span>
            </div>
          ) : (
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-black text-amber-400">
                  ₹{product.offerPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-[10px] text-green-400 font-bold bg-green-950/60 px-1.5 py-0.5 rounded border border-green-800">
                  Save ₹{product.originalPrice - product.offerPrice}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Button: Add to Cart / Qty selector */}
        <div className="pt-1">
          {product.isCall ? (
            <a
              href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20please%20quote%20price%20for%20"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" /> Inquire Price
            </a>
          ) : inCartQty > 0 ? (
            <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/40 rounded-xl p-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.productNumber || product._id, inCartQty - 1);
                }}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-extrabold text-amber-300 px-2">
                {inCartQty} in cart
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.productNumber || product._id, inCartQty + 1);
                }}
                className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-colors font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-950/40 transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
