import {  makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import type { Modelfile } from "../models/ModelFile";
import type { OptionBase } from "../models/Optionbase";

export default class ModelfileStore {
    ModelfileRegistry = new Map<string, Modelfile>();
    selectedModelfile: Modelfile| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }


    loadModelfiles = async (is_exclude_used: boolean) => {
        this.loading = true;
        this.ModelfileRegistry.clear();
        try {
            const modelfiles = await agent.Modelfiles.list(is_exclude_used);
            //@ts-ignore
            modelfiles.forEach(modelfile => {
                this.setModelfile(modelfile);
            })
            this.setLoaing(false);
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
    }
    

    loadModelfile = async (id:string) => {
        this.loading = true;
        let object:Modelfile;
        
        try {
            
            object = await agent.Modelfiles.details(id);
            this.setModelfile(object);
            runInAction(()=>{
                this.selectedModelfile = object;
            })
            this.setLoaing(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }

    
    updateModelfile = async (object: Modelfile) => {
        this.loading = true;
        
        try {
            await agent.Modelfiles.update(object);
            runInAction(() => {
                this.ModelfileRegistry.set(object.id_part, object);
                this.selectedModelfile = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    
    

    
    deleteModelfile = async (object: Modelfile) => {
        this.loading = true;
        
        try {
            await agent.Modelfiles.delete(object.id_part);
            runInAction(() => {
                this.ModelfileRegistry.delete(object.id_part);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    
    
    setSelectedModelfile = async (id_part:string) => {
        let modelfile = this.getModelfile(id_part);
        if(modelfile) {
            runInAction(()=>{
                this.selectedModelfile = modelfile;
            })
            return modelfile;
        } else {
            this.loading = true;
            try {
                modelfile = await agent.Modelfiles.details(id_part);
                //@ts-ignore
                this.setModelfile(modelfile);
                runInAction(()=>{
                    this.selectedModelfile = modelfile;
                })
                this.setLoaing(false);
                return modelfile;
            } catch (error) {
                console.log(error);
                this.setLoaing(false);
            }
        }
    }
    

    getOptionArray=()=>{
        const ans = Array<OptionBase>();

        
        Array.from(this.ModelfileRegistry.values()).map(modelfile=>(
            ans.push({label: modelfile.part_number, value: modelfile.id_part.toString()})
        ))
        return ans;
    }

    private setModelfile = (modelfile : Modelfile) => {
        this.ModelfileRegistry.set(modelfile.id_part,modelfile);
    }

    private getModelfile=(id:string) => {
        return this.ModelfileRegistry.get(id);
    }

    setLoaing = (state: boolean) => {
        this.loading = state;
    }


}