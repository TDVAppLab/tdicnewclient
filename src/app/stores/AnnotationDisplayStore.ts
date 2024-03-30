import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { AnnotationDisplay } from "../models/AnnotationDisplay";

export default class AnnotationDisplayStore {
    //annotationDisplayRegistry = new Map<number, AnnotationDisplay>();
    annotationDisplayArray:AnnotationDisplay[] = [];
    selectedAnnotationDisplayMap = new Map<number, AnnotationDisplay>();
    //selectedAnnotationDisplay: AnnotationDisplay | undefined = undefined;
    selectedInstructionId=0;
    loading=false;

    
    id_article: string = "";

    constructor(){
        makeAutoObservable(this)
    }


    loadAnnotationDisplays = async (id_article:string) => {

        if(id_article === "") {            
            runInAction(()=>{
                this.selectedAnnotationDisplayMap.clear();
            })
            return null;
        }


        this.loading = true;
        //this.annotationDisplayRegistry.clear();

        this.annotationDisplayArray.length=0;
        try {
            this.annotationDisplayArray = await agent.AnnotationDisplays.list(id_article);
            

            runInAction(()=>{
                this.id_article=id_article;
                if(this.annotationDisplayArray.length<1){
                    this.selectedAnnotationDisplayMap.clear();
                }
            })
            
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setSelectedAnnotationDisplayMap = async (id_instruct:number) => {
        let objects = this.annotationDisplayArray.filter((item:AnnotationDisplay) => item.id_instruct === id_instruct);
        if(objects) {
            this.selectedAnnotationDisplayMap.clear();
            runInAction(()=>{
                objects.forEach(annotationDisplay => {
                    this.setAnnotationDisplay(annotationDisplay);
                })
            })
            
            this.selectedInstructionId=id_instruct;
            return objects;
        } /*else {
            this.loadingInitial = true;
            try {
                instruction = await agent.Instructions.details(id_article,id_instruct);
                this.setInstruction(instruction);
                runInAction(()=>{
                    this.selectedInstruction = instruction;
                })
                this.setLoaingInitial(false);
                return instruction;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }*/
    }


    updateAnnotationDisplay = async (objects: AnnotationDisplay[]) => {
        this.loading = true;

        //const prv_article = objects[0].id_article;
        const prv_selectedInstruction = this.selectedInstructionId;
        
        try {
            await agent.AnnotationDisplays.update(objects);
            //const result_object = await agent.Lights.details(object.id_article, object.id_light);
            runInAction(() => {

                objects.forEach(object => {
                    const i = this.annotationDisplayArray.findIndex(x => x.id_article === object.id_article && x.id_instruct === object.id_instruct && x.id_annotation === object.id_annotation );
                    if(i !== -1){
                        this.annotationDisplayArray[i] = object;
                    }
                })
                this.setSelectedAnnotationDisplayMap(prv_selectedInstruction);                
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    deleteAnnotationDisplayArray = async (id_annotation: number) => {
        this.loading = true;

        try {
            runInAction(() => {
                this.annotationDisplayArray = this.annotationDisplayArray.filter(x => x.id_annotation !== id_annotation);
                this.selectedInstructionId !== 0 &&this.setSelectedAnnotationDisplayMap(this.selectedInstructionId);                
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setAnnotationDisplay = (object : AnnotationDisplay) => {
        this.selectedAnnotationDisplayMap.set(object.id_annotation,object);
    }

    private getAnnotationDisplay=(id_annotation:number) => {
        return this.selectedAnnotationDisplayMap.get(id_annotation);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}