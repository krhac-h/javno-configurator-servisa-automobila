
interface CouponBlockProps {
    setDiscountMsg: (discount: string) => void;
    setDiscount: (discount: number) => void;
}

interface DiscountResponse {
    id?: string;
    code?: string;
    discountPercentage?: number;
    cause?: string;
    message?: string;
}

import { useState } from "react"
import { validatePromoCode } from "@/Api";
import IMG from "@/assets/vector.svg"
const CouponBlock: React.FC<CouponBlockProps> = ({ setDiscountMsg, setDiscount }) => {
    const [clicked, setClicked] = useState(false)

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleDiscount = (res: DiscountResponse) => {

        if (res.message) return;

        if (res.discountPercentage !== undefined && typeof res.discountPercentage === 'number') {
            if (res.discountPercentage > 1 && res.discountPercentage < 90) {
                if (res.code !== undefined) {
                    setDiscountMsg(res.code);
                }
                setDiscount(res.discountPercentage);
            }
        }
    };

    return (
        <>
            {!clicked &&
                <div className="a"
                    onClick={() => setClicked(true)}
                >Imam kupon</div>
            }
            {clicked &&

                <div className="flex gap-10px">
                    <input type="text" style={{ maxWidth: "155px" }} required value={inputValue} onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                validatePromoCode(inputValue).then((res) => handleDiscount(res));
                            }
                        }}
                        placeholder="Unesi kod" />

                    <button disabled={Number(inputValue) < 4}
                        onClick={() => validatePromoCode(inputValue).then(res => handleDiscount(res))}>
                        <img src={IMG}></img></button>
                </div>

            }

        </>
    )
}

export default CouponBlock