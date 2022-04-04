import "../styling/team.css";

export const Team = () => {
    return (
        <section className="teamContainer">
            {/* --- Liam--- */}
            <article className="teamMember">
                <p className="member_name">Liam <a href="https://github.com/LiamSmith" target="_blank"><i class="fab fa-github"></i> </a> <a href="" target="_blank"> <i class="fab fa-linkedin"></i></a></p>
                <p className="bio"><span>Bio:</span> say something about yourself</p>
                <p className="prjct_work"><span>Work:</span> what did you contribute to the project</p>
            </article>

            {/* --- Nate--- */}
            <article className="teamMember">
                <p className="member_name">Nate <a href="https://github.com/Nateldn" target="_blank"><i class="fab fa-github"></i> </a> <a href="" target="_blank"> <i class="fab fa-linkedin"></i></a></p>
                <p className="bio"> <span>Bio:</span> Former commerical ad tech chap, now building tech rather than talking about it. </p>
                <p className="prjct_work"><span>Work:</span> Mostly front-end: (login and settings) plus styling. </p>
            </article>


            {/* --- Damien--- */}
            <article className="teamMember">
                <p className="member_name">Damien <a href="https://github.com/damien-rembert" target="_blank"><i class="fab fa-github"></i> </a> <a href="" target="_blank"> <i class="fab fa-linkedin"></i></a></p>
                <p className="bio"><span>Bio:</span> say something about yourself</p>
                <p className="prjct_work"><span>Work:</span> what did you contribute to the project</p>
            </article>

            {/* --- Terry--- */}
            <article className="teamMember">
                <p className="member_name">Terry <a href="https://github.com/Terrys101" target="_blank"><i class="fab fa-github"></i> </a> <a href="" target="_blank"> <i class="fab fa-linkedin"></i></a></p>
                <p className="bio"><span>Bio:</span>say something about yourself</p>
                <p className="prjct_work"><span>Work:</span> what did you contribute to the project</p>
            </article>
            
            {/* --- Peter--- */}
            <article className="teamMember">
                <p className="member_name">Peter <a href="https://github.com/MonkeyJuggler" target="_blank"><i class="fab fa-github"></i> </a> <a href="" target="_blank"> <i class="fab fa-linkedin"></i></a></p>
                <p className="bio"><span>Bio:</span> say something about yourself</p>
                <p className="prjct_work"><span>Work:</span>  what did you contribute to the project</p>
            </article>

                {/* --- Julia--- */}
            <article className="teamMember">
                <p className="member_name">Julia <a href="https://github.com/jull92" target="_blank"><i class="fab fa-github"></i> </a> <a href="https://www.linkedin.com/in/julia-lang-38a1a221b/" target="_blank"> <i class="fab fa-linkedin"></i></a></p>
            
                <p className="bio"> <span>Bio:</span> From an early age I've been interested in technology and computing. I started my journey in tech with Code Nation in 2021 when I completed the Develop:Coding then the Develop:Cyber courses. These courses really kindled my interest in coding so attending the Master course was a natural progression. I am excited to start my career in IT, learn new skills and meet new people.</p>
                <p className="prjct_work"><span>Work:</span> creation of the framework, basic structure and styling of several pages, presentation</p>
            </article>
        </section>
    )
}