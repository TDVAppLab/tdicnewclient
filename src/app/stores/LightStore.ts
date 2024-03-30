import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Light } from "../models/Light";


export default class LightStore {
    lightRegistry = new Map<number, Light>();
    selectedLight: Light| undefined = undefined;
    loading=false;

    
    id_article: string = "";

    constructor(){
        makeAutoObservable(this)
    }


    loadLights = async (id_article:string) => {
        
        if(id_article === "") {
            runInAction(()=>{
                this.lightRegistry.clear();
            })
            return null;
        }


        this.loading = true;
        this.lightRegistry.clear();
        try {
            const lights = await agent.Lights.list(id_article);
            lights.forEach(light => {
                this.setLight(light);
            })

            runInAction(()=>{
                this.id_article=id_article;
                if(this.lightRegistry.size<1){
                    this.selectedLight = undefined
                }
            })
            
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoading(false);
        }
    }

    setSelectedLight = async (id_light:number) => {
        let light = this.getLight(id_light);
        if(light) {
            this.selectedLight = light;
            runInAction(()=>{
                this.selectedLight = light;
            })
            return light;
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

    
    
    createLight = async (object: Light) => {
        //this.loading = true;
        //console.log("called light create");
        try {
            //await agent.Lights.create(object);
            const result_object = await (await agent.Lights.create(object)).data;
            runInAction(() => {
                this.lightRegistry.set(result_object.id_light, result_object);
                this.selectedLight = result_object;
                //this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                //this.loading = false;
            })
        }
    }

    updateLight = async (object: Light) => {
        //this.loading = true;
        
        try {
            await agent.Lights.update(object);
            const result_object = await agent.Lights.details(object.id_article, object.id_light);
            //const result_object = object;
            runInAction(() => {
                this.lightRegistry.set(result_object.id_light, result_object);
                this.selectedLight = result_object;
            //    this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    

    
    deleteLight = async (object: Light) => {
        this.loading = true;
        
        try {
            await agent.Lights.delete(object.id_article, object.id_light);
            runInAction(() => {
                this.lightRegistry.delete(object.id_light);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    


    private setLight = (object : Light) => {
        this.lightRegistry.set(object.id_light,object);
    }

    private getLight=(id_light:number) => {
        return this.lightRegistry.get(id_light);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}