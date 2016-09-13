class LazyPromise extends Promise{
    constructor(exec){
        let onceThened
        super((rs,rj)=>
            exec(rs,rj,onceThened_=>{
                onceThened=onceThened_
            })
        )
        this._onceThened=onceThened
    }
    then(){
        if(this._onceThened){
            this._onceThened()
            delete this._onceThened
        }
        return super.then.apply(this,arguments)
    }
    lazyThen(){
        return new this.constructor[Symbol.species]((rs,rj,onceThened)=>{
            onceThened(()=>{
                this.then.apply(this,arguments).then(rs)
            })
        })
    }
}
