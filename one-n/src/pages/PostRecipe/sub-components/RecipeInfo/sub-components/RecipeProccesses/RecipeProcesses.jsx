import React, { useRef } from "react";

import Button from "../../../../../../components/Button/Button";

import { ReactComponent as PlusIcon } from "../../../../../../assets/icons/plus.svg";
import { ReactComponent as CamerIcon } from "../../../../../../assets/icons/camera.svg";

import { EMPTY_PROCESS } from "../../../../consts/const";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import styles from "./RecipeProcesses.module.scss";

function RecipeProcesses() {
    const { recipeProcesses } = usePostInfoValue();
    const { setRecipeProcesses } = usePostInfoAction();

    // NOTE: 사용자가 추가한 레시피 과정이 변경되었을 때 호출되는 함수
    const updateProcessInfo = ({ index, field, value }) => {
        const updatedProcesses = [...recipeProcesses];
        updatedProcesses[index] = {
            ...updatedProcesses[index],
            [field]: value,
        };
        setRecipeProcesses(updatedProcesses);
    };

    // NOTE: 레시피 과정 추가
    const addProcess = () => {
        setRecipeProcesses([...recipeProcesses, EMPTY_PROCESS]);
    };

    return (
        <div className={styles.RecipeProcesses}>
            {recipeProcesses.map((recipeProgress, index) => (
                <RecipeProcess
                    key={index}
                    index={index}
                    recipeProgress={recipeProgress}
                    onInputChanged={updateProcessInfo}
                />
            ))}
            <Button
                icon={PlusIcon}
                color="white"
                size="md"
                onClick={addProcess}
            >
                과정 추가
            </Button>
        </div>
    );
}

function RecipeProcess({ index, recipeProgress, onInputChanged }) {
    const inputRef = useRef(null);

    // NOTE: 선택된 사진이 변경될 경우 실행
    const onImageInputChanged = (e) => {
        if (e.target.files?.length > 0) {
            onInputChanged({
                index,
                field: "image",
                value: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    // NOTE: 레시피 과정 설명이 변경될 경우 실행
    const onTextareaInputChanged = (value) => {
        onInputChanged({
            index,
            field: "description",
            value,
        });
    };

    return (
        <div className={styles.RecipeProcess}>
            <div
                className={styles.processImage}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    className={styles.input}
                    ref={inputRef}
                    type="file"
                    onChange={onImageInputChanged}
                    accept="image/*"
                />

                {/* NOTE: 업로드한 이미지가 있는 경우 이미지를 보여줌 */}
                {recipeProgress.image && (
                    <img
                        className={styles.image}
                        src={recipeProgress.image}
                        alt="레시피 과정 이미지"
                    />
                )}

                {/* NOTE: 이미지가 없는 경우 업로드 아이콘을 보여줌 */}
                {!recipeProgress.image && <CamerIcon />}
            </div>
            <DescriptionTextarea
                index={index}
                value={recipeProgress.description}
                onInputChanged={onTextareaInputChanged}
            />
        </div>
    );
}

function DescriptionTextarea({
    index = 0,
    value = "",
    onInputChanged = () => {},
}) {
    const textareaRef = useRef(null);

    // NOTE: textarea의 입력이 변경될 때마다 실행되는 함수
    const onTextareaInputChanged = (e) => {
        onInputChanged(e.target.value);

        // NOTE: textarea의 높이를 자동으로 조절함
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
    };

    return (
        <div className={styles.DescriptionTextarea}>
            <p className={styles.processNumber}>{index + 1}</p>
            <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={value}
                onChange={onTextareaInputChanged}
                placeholder="내용을 입력해 주세요"
                rows={1}
            />
        </div>
    );
}

export default RecipeProcesses;
