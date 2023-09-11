import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Alert, Form, Button } from "react-bootstrap";
import WordCloudComponent from "./cloud";
import { useEffect } from "react";

const CloudPage = () => {
    const [value, setValue] = useState({ content: "" });
    const wordsQuery = useQuery("words", () => axios.get("http://localhost:5101/get-words"),);
    console.log(value)
    const onChange = (e) => {
        setValue((prevState) => {
            return {content: e.target.value};
        });
    };



    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:5101/insert-word", {
            content: value.content,
        });
        refetch();
        setValue((prevState) => {
            return {content: ""};
        });
    };

    const deleteAll = async () => {
        await axios.delete("http://localhost:5101/remove-word");
        refetch();
    };

    const refetch = () => {
        wordsQuery.refetch();
    };
    useEffect(()=> {
    })
    if (wordsQuery.isLoading) return <>Loading</>;
    if (wordsQuery.isError)
        return (
            <Alert variant="danger" className="text-center">
                Błąd podczas pobierania danych z serwera. Proszę zaczekać i odświeżyć stronę! <br /> Brak dostępu do
                danych
            </Alert>
        );
    return (
        <div className="App bg-dark">
            <h1 className="bg-light p-4">Chmura Wyrazów</h1>
            <WordCloudComponent
                words={wordsQuery.data.data.map((word) => {
                    return { text: word._id, value: word.count };
                })}
            />
            <Form className="m-4" onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label className="text-light" htmlFor="word">
                        Dodaj swoje słowo
                    </Form.Label>
                    <Form.Control
                        name="word"
                        onChange={onChange}
                        value={value.content}
                        type="text"
                        placeholder="Słowo..."
                    />
                </Form.Group>
                <Button className="m-2" type="submit">
                    Dodaj słowo
                </Button>
            </Form>
            <div className="d-flex justify-content-evenly">
                <Button onClick={deleteAll}>Zresetuj chmurę</Button>
                <Button onClick={refetch}>Wygeneruj chmurę</Button>
            </div>
        </div>
    );
};

export default CloudPage;
