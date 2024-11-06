import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Main from "@/layouts/Main"

import FormSection from "@/components/FormSection"
import TableRowContact from "@/components/TableRowContact";
import SimpleLoading from "@/components/SimpleLoading";
import CouponBlock from "@/components/CouponBlock";
import TableServices from "@/components/TableServices";

import { fetchManufacturers, fetchServices, postContact } from "@/Api";

import imgx from "@/assets/ecs-icon.png"
const Form = () => {

    const manufacturers = useQuery({
        queryKey: ["manufacturers"],
        queryFn: fetchManufacturers,
    });
    const services = useQuery({
        queryKey: ["services"],
        queryFn: fetchServices,
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const promoCodeValue = formData.promoCode.trim();
        const updatedFormData = {
            ...formData,
            promoCode: promoCodeValue === '' ? null : promoCodeValue,
            serviceIds: selectedServices.length > 0 ? selectedServices.map((service) => service) : [],
        };

        try {
            await postContact(updatedFormData).then(() => navigate("/success"));
        } catch (error) {
            console.error(error);
        }
    };
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        manufacturerId: "",
        promoCode: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        note: "",
    });
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountMsg, setDiscountMsg] = useState<string>("");
    const [stage, setStage] = useState(false);

    const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        if (checked) {

            setSelectedServices((prevServices: string[]) => [...prevServices, id]);
        } else {
            setSelectedServices((prevServices: string[]) => prevServices.filter((service: string) => service !== id));
        }
    };

    useEffect(() => {
        if (services.data) {
            const filteredServices = services.data.filter((service: { id: string; price: number; }) => selectedServices.includes(service.id));
            const totalPrice = filteredServices.reduce((acc: number, service: { id: string; price: number; }) => acc + service.price, 0);
            setTotalPrice(totalPrice - (totalPrice * (discount / 100)));
        }
    }, [selectedServices, services.data, discount]);

    const tableConstructor = [
        { title: "Ime i prezime", data: formData.fullName },
        { title: "E-mail adresa", data: formData.email },
        { title: "Broj telefona", data: formData.phoneNumber },
        { title: "Napomena", data: formData.note },
    ];

    return (
        <Main>
            <div className="wrapper">
                <h2 className="font-bold" style={{ padding: "40px 20px 20px 30px" }}>Konfigurator Servisa</h2>
                {
                    !stage ?

                        <>

                            <FormSection title="Odaberite proizvođača vašeg vozila">
                                <SimpleLoading visible={manufacturers.isLoading} />
                                <div className="grid grid-col-3 gap-10px ">
                                    {!manufacturers.isLoading &&
                                        manufacturers.data.slice(0, 30).map(item =>
                                            <div className="flex gap-10px" key={item.id}>
                                                <input type="radio" className="my-auto" name="manufacturer" id={`manu-${item.id}`}
                                                    onClick={() => setFormData({ ...formData, manufacturerId: item.id })}
                                                />
                                                <label htmlFor={`manu-${item.id}`} className="w-full">{item.name}</label>
                                            </div>

                                        )
                                    }

                                </div>
                            </FormSection>
                            <FormSection title="Odaberite jednu ili više usluga koju trebate">
                                <SimpleLoading visible={services.isLoading} />
                                <div className="grid grid-col-2 gap-10px">
                                    {!services.isLoading &&
                                        services.data.slice(0, 30).map(item =>
                                            <div className="flex gap-10px" key={item.id}>
                                                <input type="checkbox" className="my-auto" name="services" id={`${item.id}`}
                                                    onChange={handleServiceChange}
                                                />
                                                <label htmlFor={`${item.id}`} className="w-full">{item.name} <span className="text-primary">{`(${item.price}€)`}</span></label>
                                            </div>
                                        )}
                                </div>
                                <div className="bg-200" style={{ padding: "10px 15px" }}>
                                    <div className="flex justify-between">
                                        <span>ukupno:&nbsp;
                                            <span className="text-primary">
                                                {totalPrice.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                                            </span>
                                        </span>

                                        <CouponBlock setDiscountMsg={setDiscountMsg} setDiscount={setDiscount} >
                                        </CouponBlock>
                                    </div>
                                </div>
                                            {discountMsg && <small className="h-min"  >
                                                <span className="flex gap-5px">

                                                {discountMsg} 
                                                <span onClick={() => (setDiscount(100), setDiscountMsg(""))}>
                                                    <img src={imgx} alt="" />
                                                </span>
                                                </span>
                                            </small> }

                            </FormSection>
                            <FormSection title="Vaši podaci">
                                <div className="grid grid-col-2 gap-20px">
                                    <label htmlFor="fullName" className="small" >
                                        Ime i prezime
                                        <input type="text" name="fullName" id="name" minLength={3} required placeholder="Unesite ime i prezime"
                                            onChange={(event) => { setFormData({ ...formData, fullName: event.target.value }) }}
                                        />
                                    </label>
                                    <label htmlFor="tel" className="small">
                                        Broj telefona
                                        <input type="text" name="tel" id="tel" minLength={5} required placeholder="Unesite broj telefona"
                                            onChange={(event) => { setFormData({ ...formData, phoneNumber: event.target.value }) }}
                                        />
                                    </label>
                                </div>
                                <label htmlFor="text" className="small">
                                    Email adresa
                                    <input type="email" name="eamil" id="email" minLength={5} required placeholder="Unesite email adresu"
                                        onChange={(event) => { setFormData({ ...formData, email: event.target.value }) }} />
                                </label>
                                <div>
                                    <label htmlFor="note" className="small" >
                                        Napomena (opcionalno)
                                        <textarea name="text" id="note" placeholder="Unesite napomenu"
                                            onChange={(event) => { setFormData({ ...formData, note: event.target.value }) }}>
                                        </textarea>
                                    </label>
                                </div>


                            </FormSection>



                            <FormSection title="">
                                <button
                                    disabled={selectedServices.length === 0 || formData.manufacturerId === "" || formData.fullName.length < 3 || formData.phoneNumber.length < 5 || formData.email.length < 5}
                                    className="btn text-center" onClick={() => setStage(true)}>Dalje</button>

                            </FormSection>
                        </>
                        :
                        <>
                            <FormSection title="">
                                Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite promijeniti neki od podataka, vratite se na prethodni korak. Kada ste provjerili ispravnost svojih podataka, za slanje upita na servis pritisnite gumb “Pošalji”.
                                <div className="bg-200 py-20px">
                                    <FormSection title="Model Vozila">
                                        <p>
                                            {formData.manufacturerId &&
                                                // manufacturers.data.filter((item, index) => index === formData.manufacturer - 1)[0].name;
                                                manufacturers.data[formData.manufacturerId - 1].name
                                            }
                                        </p>

                                    </FormSection>
                                    <FormSection title="Odabrane Usluge">

                                        {
                                            selectedServices &&
                                            <TableServices selectedServices={selectedServices} servicesData={services.data} discount={discount} />
                                        }


                                    </FormSection>
                                    <FormSection title="Kontakt podaci">
                                        <table>
                                            <tbody>
                                                {
                                                    tableConstructor.slice(0, 30).map((item, N) =>
                                                        <TableRowContact
                                                            title={item.title}
                                                            data={item.data}
                                                            key={N} />
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </FormSection>
                                    <FormSection title="">
                                        <div className="flex gap-10px">
                                            <button className="btn btn-secondary text-center" onClick={() => setStage(false)}>Natrag</button>
                                            <button className="btn w-full" onClick={handleSubmit}>Pošalji</button>
                                        </div>


                                    </FormSection>
                                </div>
                            </FormSection>
                        </>

                }
            </div>


        </Main>
    )
}

export default Form