<script setup lang="ts">


    const handleFrom = () => {
        const templateChoice = document.getElementById('template_choice') as HTMLSelectElement;
        const arrayInput = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        const inputValues = Array.from(arrayInput).reduce((acc, input) => {
            if (input.name) {
                acc[input.name] = input.value;
            }
            return acc;
        }, {} as Record<string, string>);

        // createPrompt(inputValues);


        console.log(inputValues, templateChoice.value);
    }

</script>

<template>

    <button id="submit" @click="handleFrom()">Envoyer</button>

</template>

<style scoped>

    #submit {    
        display: flex;
        justify-content: center;
        align-items: center;
        width: 75px;
        height: 35px;
        border: none;
        border-radius: 15px;
        font-size: 1em;
        font-weight: bold;
        font-family: 'Merriweather', sans-serif;
        cursor: pointer;
        text-align: center;
        line-height: 50px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        background-color: #38718C;
        color: #f2efbd;
    }

</style>